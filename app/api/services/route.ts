import cloudinary from "@/libs/cloudinary";
import { connectDB } from "@/libs/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { logActivity } from "@/libs/activity";

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
  const value = Number(form.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function array(form: FormData, key: string, fallback: string[] = []) {
  const raw = form.get(key);
  if (typeof raw !== "string" || !raw.trim()) return fallback;
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

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isPublic = searchParams.get("public") === "1";

  if (isPublic) {
    const services = await Service.find({ status: { $ne: "Ẩn" }, visibility: { $ne: "draft" } })
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select("name slug description shortDescription icon status visibility price priceLabel startingPrice category image features deliverables process timeline ctaLabel ctaHref seoTitle seoDescription ogImage featured order createdAt updatedAt")
      .lean();

    return NextResponse.json(services, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800" },
    });
  }

  const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(services, {
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();
    const form = await req.formData();
    const name = text(form, "name");
    const description = text(form, "description");

    if (!name || !description) {
      return NextResponse.json({ error: "Vui lòng nhập tên và mô tả dịch vụ" }, { status: 400 });
    }

    const imageUrl = await uploadImage(form.get("thumbnail") as File | null);
    const slug = text(form, "slug") || generateSlug(name);

    const newService = await Service.create({
      name,
      slug,
      description,
      shortDescription: text(form, "shortDescription").slice(0, 220),
      icon: text(form, "icon", "Wrench") || "Wrench",
      status: normalizeStatus(text(form, "status")),
      visibility: normalizeVisibility(text(form, "visibility")),
      price: number(form, "price"),
      priceLabel: text(form, "priceLabel"),
      startingPrice: number(form, "startingPrice"),
      category: text(form, "category", "General") || "General",
      image: imageUrl,
      features: array(form, "features"),
      deliverables: array(form, "deliverables"),
      process: array(form, "process"),
      timeline: text(form, "timeline"),
      ctaLabel: text(form, "ctaLabel"),
      ctaHref: text(form, "ctaHref"),
      seoTitle: text(form, "seoTitle").slice(0, 70),
      seoDescription: text(form, "seoDescription").slice(0, 170),
      ogImage: text(form, "ogImage"),
      featured: text(form, "featured") === "true",
      order: number(form, "order"),
    });

    await logActivity({
      actor: auth.user,
      action: "create",
      entity: "service",
      entityId: newService._id.toString(),
      description: `Tạo dịch vụ ${newService.name}`,
      metadata: { slug: newService.slug, visibility: newService.visibility },
    });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Create Service Error:", error);
    return NextResponse.json({ error: "Không thể tạo dịch vụ" }, { status: 500 });
  }
}
