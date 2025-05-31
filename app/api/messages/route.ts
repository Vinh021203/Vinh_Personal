import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import Message from '@/models/Message';
import { cookies } from 'next/headers';
import { verifyToken } from '@/libs/auth';

export async function GET(req: NextRequest) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) return NextResponse.json([], { status: 200 });

  const messages = await Message.find({
    $or: [
      { senderId: user.id.toString() },
      { receiverId: user.id.toString() }
    ]
  }).sort({ createdAt: 1 });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || !user.name || !user.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { content, receiverId, isAdmin } = await req.json();
  if (!content)
    return NextResponse.json({ message: 'Thiếu nội dung' }, { status: 400 });

  const newMsg = await Message.create({
    senderId: user.id.toString(),
    senderName: user.name,
    receiverId: receiverId || null,
    isAdmin: !!isAdmin,
    content,
  });

  return NextResponse.json(newMsg, { status: 201 });
}
