import { connectDB } from '@/libs/mongodb';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const messages = await Message.find({ senderId: id }).sort({ createdAt: 1 });

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: 'No messages found' }, { status: 404 });
  }

  return NextResponse.json(messages);
}