import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

// --- GET: Lấy danh sách dịch vụ ---
export async function GET() {
  await connectDB();
  const services = await Service.find().sort({ createdAt: -1 });
  return NextResponse.json(services);
}

// --- POST: Tạo dịch vụ mới ---
export async function POST(req: Request) {
  try {
    await connectDB();
    const form = await req.formData();

    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const icon = form.get("icon") as string;
    const status = form.get("status") as "Hiển thị" | "Ẩn";
    const price = Number(form.get("price")) || 0;
    const category = (form.get("category") as string) || "General";
    const featured = form.get("featured") === "true"; // Nếu frontend có gửi checkbox featured

    // Xử lý upload ảnh thumbnail
    const thumbnail = form.get("thumbnail") as File | null;
    let imageUrl = "";

    if (thumbnail && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "services" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        }
      );
      imageUrl = uploadResult.secure_url;
    }

    const newService = new Service({
      name,
      description,
      icon,
      status,
      price,
      category,
      image: imageUrl,
      featured,
    });

    await newService.save();
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Create Service Error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
