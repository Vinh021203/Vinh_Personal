import { connectDB } from '@/libs/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const users = await User.find().select('-password').sort({ createdAt: -1 }); // Ẩn mật khẩu
  return NextResponse.json(users);
}
