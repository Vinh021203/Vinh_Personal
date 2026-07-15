import cloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  await connectDB();
  const service = await Service.findById(id);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: Context) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const { id } = await params;
    await connectDB();

    const service = await Service.findById(id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const form = await req.formData();
    const thumbnail = form.get("thumbnail") as File | null;
    let imageUrl = service.image;

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

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name: String(form.get("name") || service.name),
        description: String(form.get("description") || service.description),
        icon: String(form.get("icon") || service.icon),
        status: normalizeStatus(String(form.get("status") || service.status)),
        visibility: normalizeVisibility(String(form.get("visibility") || service.visibility)),
        price: Number(form.get("price")) || 0,
        category: String(form.get("category") || service.category),
        image: imageUrl,
        featured: form.get("featured") === "true",
      },
      { new: true },
    );

    await logActivity({ actor: auth.user, action: "update", entity: "service", entityId: id, description: `Cập nhật dịch vụ ${updatedService?.name || service.name}` });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Update Service Error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await params;
  await connectDB();
  const deleted = await Service.findByIdAndDelete(id);
  if (deleted) await logActivity({ actor: auth.user, action: "delete", entity: "service", entityId: id, description: `Xóa dịch vụ ${deleted.name}` });
  return NextResponse.json({ success: true });
}

function normalizeStatus(status?: string) {
  return status === "Ẩn" ? "Ẩn" : "Hiển thị";
}

function normalizeVisibility(value?: string) {
  return value === "draft" ? "draft" : "published";
}
