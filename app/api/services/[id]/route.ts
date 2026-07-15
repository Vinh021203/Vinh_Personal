import cloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

type Context = { params: Promise<{ id: string }> };

function generateSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function text(form: FormData, key: string, fallback = "") {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

function number(form: FormData, key: string, fallback = 0) {
  if (!form.has(key)) return fallback;
  const value = Number(form.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function array(form: FormData, key: string, fallback: string[] = []) {
  if (!form.has(key)) return fallback;
  const raw = form.get(key);
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String).map((item) => item.trim()).filter(Boolean) : fallback;
  } catch {
    return raw.split(",").map((item) => item.trim()).filter(Boolean);
  }
}

function normalizeStatus(status?: string) {
  return status === "Ẩn" || status === "hidden" ? "Ẩn" : "Hiển thị";
}

function normalizeVisibility(value?: string) {
  return value === "draft" ? "draft" : "published";
}

async function uploadImage(file: File | null) {
  if (!file || file.size <= 0) return "";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "services" }, (error, result) => {
      if (error || !result) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
  return uploadResult.secure_url;
}

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
    const name = text(form, "name", service.name);
    const imageUrl = (await uploadImage(form.get("thumbnail") as File | null)) || service.image;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        slug: text(form, "slug") || (name !== service.name ? generateSlug(name) : service.slug || generateSlug(name)),
        description: text(form, "description", service.description),
        shortDescription: text(form, "shortDescription", service.shortDescription || "").slice(0, 220),
        icon: text(form, "icon", service.icon),
        status: normalizeStatus(text(form, "status", service.status)),
        visibility: normalizeVisibility(text(form, "visibility", service.visibility)),
        price: number(form, "price", service.price),
        priceLabel: text(form, "priceLabel", service.priceLabel || ""),
        startingPrice: number(form, "startingPrice", service.startingPrice || 0),
        category: text(form, "category", service.category),
        image: imageUrl,
        features: array(form, "features", service.features || []),
        deliverables: array(form, "deliverables", service.deliverables || []),
        process: array(form, "process", service.process || []),
        timeline: text(form, "timeline", service.timeline || ""),
        ctaLabel: text(form, "ctaLabel", service.ctaLabel || ""),
        ctaHref: text(form, "ctaHref", service.ctaHref || ""),
        seoTitle: text(form, "seoTitle", service.seoTitle || "").slice(0, 70),
        seoDescription: text(form, "seoDescription", service.seoDescription || "").slice(0, 170),
        ogImage: text(form, "ogImage", service.ogImage || ""),
        featured: form.has("featured") ? text(form, "featured") === "true" : service.featured,
        order: number(form, "order", service.order || 0),
      },
      { new: true },
    );

    await logActivity({
      actor: auth.user,
      action: "update",
      entity: "service",
      entityId: id,
      description: `Cập nhật dịch vụ ${updatedService?.name || service.name}`,
      metadata: { slug: updatedService?.slug, visibility: updatedService?.visibility },
    });
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Update Service Error:", error);
    return NextResponse.json({ error: "Không thể cập nhật dịch vụ" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await params;
  await connectDB();
  const deleted = await Service.findByIdAndDelete(id);
  if (deleted) {
    await logActivity({
      actor: auth.user,
      action: "delete",
      entity: "service",
      entityId: id,
      description: `Xóa dịch vụ ${deleted.name}`,
      metadata: { slug: deleted.slug },
    });
  }
  return NextResponse.json({ success: true });
}
