import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Message from "@/models/Message";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) return NextResponse.json([], { status: 200 });

  // Nếu là Admin, có thể muốn xem tất cả tin nhắn trong hệ thống để support
  // Hoặc chỉ xem tin nhắn liên quan đến mình.
  // Ở đây ta giả định Admin sẽ thấy tất cả tin nhắn gửi đến Admin HOẶC Admin gửi đi.
  // Nếu muốn Admin thấy toàn bộ chat của hệ thống (kiểu support center), có thể bỏ filter sender/receiver.

  // Cách 1: Chỉ lấy tin nhắn liên quan đến user hiện tại
  const messages = await Message.find({
    $or: [
      { senderId: user.id.toString() },
      { receiverId: user.id.toString() },
      { receiverId: null }, // Lấy cả tin nhắn khách gửi chung chung (chưa có receiver cụ thể)
      { receiverId: "admin" }, // Fallback nếu frontend gửi receiverId="admin"
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(messages, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || !user.name || !user.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { content, receiverId, isAdmin } = await req.json();
  if (!content)
    return NextResponse.json({ message: "Thiếu nội dung" }, { status: 400 });

  const newMsg = await Message.create({
    senderId: user.id.toString(),
    senderName: user.name,
    receiverId: receiverId || null,
    isAdmin: !!isAdmin, // Chuyển đổi sang boolean
    content,
  });

  return NextResponse.json(newMsg, {
    status: 201,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
