// app/api/messages/[id]/route.ts
import { connectDB } from "@/libs/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

// ✅ Thêm config để disable cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const messages = await Message.find({
    $or: [{ senderId: id }, { receiverId: id }],
  }).sort({ createdAt: 1 });

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "No messages found" }, { status: 404 });
  }

  return NextResponse.json(messages, {
    headers: {
      // ✅ Disable cache headers
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
