import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ fix đỏ
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({ user: payload }, { status: 200 });
  } catch (err) {
    console.error("[me] Token lỗi hoặc hết hạn:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
