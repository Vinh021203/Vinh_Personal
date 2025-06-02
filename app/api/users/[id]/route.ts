import { connectDB } from '@/libs/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const user = await User.findById(id).select('-password');
  if (!user) return NextResponse.json({ error: 'User không tồn tại' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const body = await req.json();
  const updated = await User.findByIdAndUpdate(id, body, { new: true }).select('-password');

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}