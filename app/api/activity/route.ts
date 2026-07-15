import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import ActivityLog from "@/models/ActivityLog";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  await connectDB();
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json(logs);
}
