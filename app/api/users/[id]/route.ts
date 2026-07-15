import { connectDB } from "@/libs/mongodb";
import cloudinary from "@/libs/cloudinary";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUserFromCookie, requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

type RouteContext = { params: Promise<{ id: string }> };

const createToken = async (payload: Record<string, string>) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
};

export async function GET(_req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const currentSession = await getCurrentUserFromCookie();
    if (!currentSession) {
      return NextResponse.json({ error: "Bạn cần đăng nhập để tiếp tục" }, { status: 401 });
    }
    if (currentSession.role !== "admin" && String(currentSession.id) !== id) {
      return NextResponse.json({ error: "Bạn không có quyền xem dữ liệu này" }, { status: 403 });
    }

    await connectDB();

    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json(
      { error: "Không thể tải người dùng" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    const currentSession = await getCurrentUserFromCookie();
    if (!currentSession) {
      return NextResponse.json({ error: "Bạn cần đăng nhập để tiếp tục" }, { status: 401 });
    }

    const { id } = await context.params;
    const isSelfUpdate = String(currentSession.id) === id;
    if (currentSession.role !== "admin" && !isSelfUpdate) {
      return NextResponse.json({ error: "Bạn không có quyền thực hiện thao tác này" }, { status: 403 });
    }

    await connectDB();

    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 });
    }

    const role =
      currentSession.role === "admin"
        ? form.get("role") === "admin"
          ? "admin"
          : "user"
        : currentUser.role;
    const status =
      currentSession.role === "admin"
        ? form.get("status") === "inactive"
          ? "inactive"
          : "active"
        : currentUser.status;
    const password = String(form.get("password") || "");
    const avatarFile = form.get("avatar") as File | null;
    const avatarUrlFromForm = String(form.get("avatarUrl") || "").trim();
    let avatarUrl = avatarUrlFromForm || currentUser.avatar || "";
    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "avatars" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            },
          );
          stream.end(buffer);
        },
      );
      avatarUrl = uploadResult.secure_url;
    }

    let passwordHash = currentUser.password;
    if (password.trim()) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, status, avatar: avatarUrl, password: passwordHash },
      { new: true },
    ).select("-password");

    if (isSelfUpdate) {
      const tokenPayload = {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        avatar: updatedUser.avatar || "",
      };

      const newToken = await createToken(tokenPayload);
      const cookieStore = await cookies();
      cookieStore.set("token", newToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    await logActivity({ actor: currentSession, action: "update", entity: "user", entityId: id, description: `Cập nhật người dùng ${updatedUser.name}` });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật người dùng" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const { id } = await context.params;
    await connectDB();

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    await logActivity({ actor: auth.user, action: "delete", entity: "user", entityId: id, description: `Xóa người dùng ${deletedUser.name}` });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json(
      { error: "Không thể xoá người dùng" },
      { status: 500 },
    );
  }
}
