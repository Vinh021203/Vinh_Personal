import { connectDB } from '@/libs/mongodb';
import Message from '@/models/Message';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const messages = await Message.find({ senderId: params.id }).sort({ createdAt: 1 });
  return NextResponse.json(messages);
}
