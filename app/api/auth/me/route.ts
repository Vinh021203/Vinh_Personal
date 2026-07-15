import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ fix đỏ
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({ user: { ...payload, _id: payload.id } }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
  } catch (err) {
    console.error("[me] Token lỗi hoặc hết hạn:", err);
    const response = NextResponse.json({ user: null }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
    response.cookies.delete("token");
    return response;
  }
}
