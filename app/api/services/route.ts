import cloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isPublic = searchParams.get("public") === "1";

  if (isPublic) {
    const services = await Service.find({ status: { $ne: "Ẩn" }, visibility: { $ne: "draft" } })
      .sort({ createdAt: -1 })
      .select("name description icon status visibility price category image featured createdAt updatedAt")
      .lean();

    return NextResponse.json(services, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
      },
    });
  }

  const services = await Service.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(services, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();
    const form = await req.formData();
    const thumbnail = form.get("thumbnail") as File | null;
    let imageUrl = "";

    if (thumbnail && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "services" }, (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        });
        stream.end(buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const newService = await Service.create({
      name: String(form.get("name") || ""),
      description: String(form.get("description") || ""),
      icon: String(form.get("icon") || "Wrench"),
      status: normalizeStatus(String(form.get("status") || "")),
      visibility: normalizeVisibility(String(form.get("visibility") || "")),
      price: Number(form.get("price")) || 0,
      category: String(form.get("category") || "General"),
      image: imageUrl,
      featured: form.get("featured") === "true",
    });

    await logActivity({
      actor: auth.user,
      action: "create",
      entity: "service",
      entityId: newService._id.toString(),
      description: `Tạo dịch vụ ${newService.name}`,
    });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Create Service Error:", error);
    return NextResponse.json({ error: "Không thể tạo dịch vụ" }, { status: 500 });
  }
}

function normalizeStatus(status?: string) {
  return status === "Ẩn" ? "Ẩn" : "Hiển thị";
}

function normalizeVisibility(value?: string) {
  return value === "draft" ? "draft" : "published";
}
