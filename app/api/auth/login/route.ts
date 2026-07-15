import { createToken } from "@/libs/auth";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập email và mật khẩu" },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findOne({ email: String(email).trim().toLowerCase() }).exec();
    const invalidResponse = NextResponse.json(
      { message: "Email hoặc mật khẩu không đúng" },
      { status: 401 },
    );

    if (!user) return invalidResponse;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return invalidResponse;

    const token = await createToken({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
    });

    const response = NextResponse.json({
      message: "Đăng nhập thành công!",
      user: {
        _id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
