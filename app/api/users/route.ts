import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

function normalizePermissions(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 50);
}

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();

    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    return NextResponse.json({ error: "Không thể tải danh sách người dùng" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();

    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = body.role === "admin" ? "admin" : "user";
    const status = body.status === "inactive" ? "inactive" : "active";
    const avatar = String(body.avatar || "").trim();
    const phone = String(body.phone || "").trim();
    const bio = String(body.bio || "").trim().slice(0, 500);
    const permissions = role === "admin" ? normalizePermissions(body.permissions) : [];

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Vui lòng nhập đầy đủ tên, email và mật khẩu" }, { status: 400 });
    }

    const existed = await User.findOne({ email });
    if (existed) {
      return NextResponse.json({ error: "Email này đã tồn tại trong hệ thống" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      avatar,
      phone,
      bio,
      permissions,
      emailVerified: false,
      passwordChangedAt: new Date(),
    });

    const createdUser = await User.findById(user._id).select("-password");
    await logActivity({
      actor: auth.user,
      action: "create",
      entity: "user",
      entityId: user._id.toString(),
      description: `Tạo người dùng ${name}`,
      metadata: { role, status },
    });
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error("Create User Error:", error);
    return NextResponse.json({ error: "Không thể tạo người dùng" }, { status: 500 });
  }
}
