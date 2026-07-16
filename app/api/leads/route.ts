import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import Lead from "@/models/Lead";
import { logActivity } from "@/libs/activity";
import { sendLeadEmail } from "@/libs/email";

export const dynamic = "force-dynamic";

const rateLimitStore = new Map<string, number[]>();
const SPAM_WINDOW_MS = 15 * 60 * 1000;
const IP_LIMIT = 5;
const EMAIL_LIMIT = 3;

function clean(value: unknown, max = 3000) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").trim().slice(0, max) : "";
}

function normalizePriority(value: unknown) {
  return value === "low" || value === "high" ? value : "medium";
}

function getClientIp(req: NextRequest) {
  return clean(req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "", 80);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function registerHit(key: string, limit: number) {
  const now = Date.now();
  const recent = (rateLimitStore.get(key) || []).filter((time) => now - time < SPAM_WINDOW_MS);
  recent.push(now);
  rateLimitStore.set(key, recent);
  return recent.length <= limit;
}

function analyzeSpam(input: { name: string; email: string; phone: string; company: string; subject: string; message: string; website: string; ip: string }) {
  let score = 0;
  const reasons: string[] = [];
  const content = `${input.name} ${input.email} ${input.phone} ${input.company} ${input.subject} ${input.message}`.toLowerCase();

  if (input.website) {
    score += 100;
    reasons.push("honeypot field filled");
  }
  if (!isValidEmail(input.email)) {
    score += 60;
    reasons.push("invalid email");
  }
  if (!registerHit(`ip:${input.ip || "unknown"}`, IP_LIMIT)) {
    score += 45;
    reasons.push("too many submissions from same IP");
  }
  if (!registerHit(`email:${input.email}`, EMAIL_LIMIT)) {
    score += 45;
    reasons.push("too many submissions from same email");
  }

  const linkCount = content.match(/https?:\/\/|www\.|bit\.ly|t\.me|\.ru|\.xyz|\.top/g)?.length || 0;
  if (linkCount >= 2) {
    score += 35;
    reasons.push("too many links");
  }

  const spamWords = ["casino", "betting", "crypto", "forex", "viagra", "loan", "backlink", "seo backlinks", "telegram", "whatsapp"];
  const hits = spamWords.filter((word) => content.includes(word));
  if (hits.length) {
    score += hits.length * 20;
    reasons.push(`spam keywords: ${hits.join(", ")}`);
  }

  if (input.message.length < 12) {
    score += 15;
    reasons.push("message too short");
  }
  if (/(.)\1{8,}/.test(content)) {
    score += 20;
    reasons.push("repeated characters");
  }

  return { score, isSpam: score >= 60, reason: reasons.join("; ") };
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  await connectDB();
  const leads = await Lead.find().sort({ isSpam: 1, priority: -1, createdAt: -1 }).limit(300).lean();
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json().catch(() => ({}));

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const message = clean(body.message, 3000);
  const phone = clean(body.phone, 40);
  const company = clean(body.company, 160);
  const website = clean(body.website, 220);
  const subject = clean(body.subject, 180);
  const ipAddress = getClientIp(req);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Thiếu tên, email hoặc nội dung" }, { status: 400 });
  }

  const duplicate = await Lead.findOne({
    email,
    message,
    createdAt: { $gte: new Date(Date.now() - SPAM_WINDOW_MS) },
  }).select("_id").lean();

  const spam = analyzeSpam({ name, email, phone, company, subject, message, website, ip: ipAddress });
  if (duplicate) {
    spam.score += 50;
    spam.isSpam = true;
    spam.reason = [spam.reason, "duplicate recent submission"].filter(Boolean).join("; ");
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    company,
    website,
    service: clean(body.service, 120),
    budget: clean(body.budget, 120),
    projectType: clean(body.projectType, 120),
    timeline: clean(body.timeline, 120),
    subject,
    message,
    source: body.source === "chatbot" ? "chatbot" : body.source === "manual" ? "manual" : "contact",
    priority: normalizePriority(body.priority),
    status: spam.isSpam ? "spam" : "new",
    isSpam: spam.isSpam,
    spamScore: spam.score,
    spamReason: spam.reason,
    assignedTo: clean(body.assignedTo, 120),
    notes: clean(body.notes, 3000),
    utmSource: clean(body.utmSource, 120),
    utmMedium: clean(body.utmMedium, 120),
    utmCampaign: clean(body.utmCampaign, 160),
    ipAddress,
    userAgent: clean(req.headers.get("user-agent") || "", 300),
  });

  await logActivity({
    action: "create",
    entity: "lead",
    entityId: lead._id.toString(),
    description: spam.isSpam ? `Lead nghi spam từ ${lead.name}` : `Lead mới từ ${lead.name}`,
    metadata: { source: lead.source, service: lead.service, priority: lead.priority, spamScore: lead.spamScore, spamReason: lead.spamReason },
  });

  if (!spam.isSpam) {
    try {
      await sendLeadEmail({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        service: lead.service,
        budget: lead.budget,
        timeline: lead.timeline,
        subject: lead.subject,
        message: lead.message,
      });
    } catch (error) {
      console.error("Lead email failed:", error);
    }
  }

  return NextResponse.json(lead, { status: 201 });
}
