import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import Lead from "@/models/Lead";
import { logActivity } from "@/libs/activity";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: Context) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await context.params;
  const body = await req.json().catch(() => ({}));
  const status = ["new", "contacted", "qualified", "archived"].includes(body.status)
    ? body.status
    : undefined;

  if (!status) return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });

  await connectDB();
  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  if (!lead) return NextResponse.json({ error: "Không tìm thấy lead" }, { status: 404 });

  await logActivity({
    actor: auth.user,
    action: "update",
    entity: "lead",
    entityId: id,
    description: `Cập nhật lead ${lead.name} sang ${status}`,
  });

  return NextResponse.json(lead);
}

export async function DELETE(_req: NextRequest, context: Context) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await context.params;
  await connectDB();
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) return NextResponse.json({ error: "Không tìm thấy lead" }, { status: 404 });

  await logActivity({
    actor: auth.user,
    action: "delete",
    entity: "lead",
    entityId: id,
    description: `Xóa lead ${lead.name}`,
  });

  return NextResponse.json({ success: true });
}
