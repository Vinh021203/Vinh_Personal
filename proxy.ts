// File: proxy.ts (Không dùng tên middleware.ts nữa)
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./libs/auth";

// 👇 QUAN TRỌNG: Đổi tên hàm từ 'middleware' thành 'proxy'
export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  try {
    const payload = await verifyToken(token || "");

    console.log("[proxy] role:", payload.role); // Sửa log cho khớp tên mới

    if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("[proxy] Token invalid:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
