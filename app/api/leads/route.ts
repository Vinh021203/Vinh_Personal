import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import Lead from "@/models/Lead";
import { logActivity } from "@/libs/activity";

export const dynamic = "force-dynamic";

function clean(value: unknown, max = 3000) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").trim().slice(0, max) : "";
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  await connectDB();
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(300).lean();
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json().catch(() => ({}));

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const message = clean(body.message, 3000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Thiếu tên, email hoặc nội dung" }, { status: 400 });
  }

  const lead = await Lead.create({
    name,
    email,
    phone: clean(body.phone, 40),
    service: clean(body.service, 120),
    budget: clean(body.budget, 120),
    subject: clean(body.subject, 180),
    message,
    source: body.source === "chatbot" ? "chatbot" : "contact",
    status: "new",
  });

  await logActivity({
    action: "create",
    entity: "lead",
    entityId: lead._id.toString(),
    description: `Lead mới từ ${lead.name}`,
  });

  return NextResponse.json(lead, { status: 201 });
}
