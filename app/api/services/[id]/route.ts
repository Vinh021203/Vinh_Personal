import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

// --- GET: Chi tiết dịch vụ ---
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const service = await Service.findById(id);
  if (!service)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

// --- PUT: Cập nhật dịch vụ ---
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const service = await Service.findById(id);
    if (!service)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const form = await req.formData();

    const name = form.get("name") as string;
    const description = form.get("description") as string;
    const icon = form.get("icon") as string;
    const status = form.get("status") as "Hiển thị" | "Ẩn";
    const price = Number(form.get("price"));
    const category = form.get("category") as string;
    // const featured = form.get('featured') === 'true'; // Uncomment nếu có

    // Xử lý ảnh: Nếu có upload mới -> up lên Cloudinary, ngược lại giữ nguyên ảnh cũ
    const thumbnail = form.get("thumbnail") as File | null;
    let imageUrl = service.image;

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

    const updatedData = {
      name,
      description,
      icon,
      status,
      price,
      category,
      image: imageUrl,
      // featured
    };

    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Update Service Error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// --- DELETE: Xóa dịch vụ ---
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  await Service.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
