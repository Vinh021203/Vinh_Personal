import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import Message from "@/models/Message";
import { logActivity } from "@/libs/activity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function noStore<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...(init?.headers || {}),
    },
  });
}

function cleanText(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") return "";

  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function cleanArray(value: unknown, maxItems = 5) {
  return Array.isArray(value)
    ? value.map((item) => cleanText(item, 500)).filter(Boolean).slice(0, maxItems)
    : [];
}

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function GET() {
  await connectDB();

  const user = await getUserFromCookie();
  if (!user) return noStore([]);

  const isAdmin = user.role === "admin";
  const query = isAdmin
    ? {}
    : {
        $or: [
          { senderId: user.id.toString() },
          { receiverId: user.id.toString() },
          { conversationId: user.id.toString() },
        ],
      };

  const messages = await Message.find(query).sort({ createdAt: 1 }).lean();
  return noStore(messages);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const user = await getUserFromCookie();
  const body = await req.json().catch(() => ({}));
  const content = cleanText(body.content);

  if (!content) {
    return noStore({ message: "Thiếu nội dung tin nhắn" }, { status: 400 });
  }

  const isAuthenticated = !!user?.id;
  const guestId = cleanText(body.guestId, 80);
  const senderId = isAuthenticated
    ? user.id.toString()
    : /^guest-[a-z0-9-]{8,}$/i.test(guestId)
      ? guestId
      : `guest-${crypto.randomUUID()}`;

  const senderName = isAuthenticated
    ? user.name || "Người dùng"
    : cleanText(body.senderName, 80) || "Khách truy cập";

  const receiverId = cleanText(body.receiverId, 120) || null;
  const canSendAsAdmin = user?.role === "admin" && !!body.isAdmin;
  const conversationId = cleanText(body.conversationId, 120) || (canSendAsAdmin ? receiverId || senderId : senderId);

  const newMessage = await Message.create({
    conversationId,
    senderId,
    senderName,
    senderEmail: isAuthenticated ? user.email || "" : cleanText(body.senderEmail, 160).toLowerCase(),
    receiverId,
    isAdmin: canSendAsAdmin,
    content,
    attachments: cleanArray(body.attachments),
    read: canSendAsAdmin,
    deliveredAt: new Date(),
    status: "sent",
    metadata: {
      source: cleanText(body.source, 60) || "chat",
      userAgent: cleanText(req.headers.get("user-agent"), 300),
    },
  });

  return noStore(newMessage, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  await connectDB();

  const user = await getUserFromCookie();
  if (!user || user.role !== "admin") {
    return noStore({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const conversationId = cleanText(body.conversationId, 120);
  if (!conversationId) {
    return noStore({ message: "Thiếu conversationId" }, { status: 400 });
  }

  const result = await Message.updateMany(
    {
      $or: [{ conversationId }, { senderId: conversationId }],
      isAdmin: { $ne: true },
      read: { $ne: true },
    },
    { $set: { read: true, status: "read", readAt: new Date() } },
  );

  if (result.modifiedCount > 0) {
    await logActivity({
      actor: user,
      action: "mark_read",
      entity: "message",
      entityId: conversationId,
      description: `Đánh dấu ${result.modifiedCount} tin nhắn đã đọc`,
      metadata: { conversationId },
    });
  }

  return noStore({ success: true, modifiedCount: result.modifiedCount });
}
