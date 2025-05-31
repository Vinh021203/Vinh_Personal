import { connectDB } from '@/libs/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const user = await User.findById(params.id).select('-password');
  if (!user) return NextResponse.json({ error: 'User không tồn tại' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const body = await req.json();
  const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password');

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();

  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
