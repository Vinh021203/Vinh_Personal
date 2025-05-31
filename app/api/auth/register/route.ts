// app/api/register/route.ts
import { connectDB } from '@/libs/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Thiếu thông tin đăng ký' }, { status: 400 });
    }

    await connectDB();

    // ✅ Giờ đã không lỗi
    const userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return NextResponse.json({ message: 'Email đã tồn tại' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'Đăng ký thành công', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Đăng ký lỗi:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}
