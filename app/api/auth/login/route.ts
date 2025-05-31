import { connectDB } from '@/libs/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createToken } from '@/libs/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Thiếu email hoặc mật khẩu' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email }).exec();
    if (!user) return NextResponse.json({ message: 'Email không tồn tại' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: 'Sai mật khẩu' }, { status: 401 });

    const token = await createToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ message: 'Đăng nhập thành công!' });
    response.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 900,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}
