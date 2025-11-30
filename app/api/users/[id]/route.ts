import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers"; // Thêm để set cookie
import { SignJWT } from "jose"; // Thêm để tạo token mới

// Hàm tạo token (tách ra dùng lại hoặc viết thẳng vào đây)
const createToken = async (payload: any) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d") // Thời hạn token
    .sign(secret);
};

// ... (GET và DELETE giữ nguyên)

// --- PUT: Cập nhật user ---
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const form = await req.formData();
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const role = form.get("role") as string;
    const status = form.get("status") as string;
    const password = form.get("password") as string;
    const avatarFile = form.get("avatar") as File | null;

    const currentUser = await User.findById(id);
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Xử lý Avatar
    let avatarUrl = currentUser.avatar;
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
            }
          );
          stream.end(buffer);
        }
      );
      avatarUrl = uploadResult.secure_url;
    }

    // 2. Xử lý Password
    let passwordHash = currentUser.password;
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    // 3. Update Data
    const updateData = {
      name,
      email,
      role,
      status,
      avatar: avatarUrl,
      password: passwordHash,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    // --- QUAN TRỌNG: UPDATE COOKIE NẾU LÀ CHÍNH MÌNH ---
    // Kiểm tra xem người đang thực hiện request có phải là người đang đăng nhập không
    // (Hoặc đơn giản là luôn update token mới cho user vừa được sửa nếu logic cho phép)
    // Ở đây ta sẽ tạo token mới chứa avatar mới

    const tokenPayload = {
      id: updatedUser._id.toString(),
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      avatar: updatedUser.avatar, // Avatar mới nhất!
    };

    const newToken = await createToken(tokenPayload);
    const cookieStore = await cookies();

    // Set lại cookie với token mới
    cookieStore.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 ngày
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
