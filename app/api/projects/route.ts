import { connectDB } from "@/libs/mongodb";
import cloudinary from "@/libs/cloudinary";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/libs/auth";
import { sanitizeHtml } from "@/libs/sanitize";
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

function dateValue(form: FormData, key: string) {
  const value = text(form, key);
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

async function uploadImage(file: File | null, folder: string) {
  if (!file || file.size <= 0) return "";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
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
  const slug = searchParams.get("slug");

  if (isPublic) {
    const filter: Record<string, unknown> = { visibility: { $ne: "draft" } };
    if (slug) filter.slug = slug;

    const fields = [
      "name",
      "slug",
      "client",
      "category",
      "industry",
      "status",
      "priority",
      "budget",
      "progress",
      "summary",
      "content",
      "clientLogo",
      "duration",
      "startDate",
      "endDate",
      "role",
      "liveUrl",
      "githubUrl",
      "image",
      "gallery",
      "description",
      "tags",
      "technologies",
      "features",
      "results",
      "seoTitle",
      "seoDescription",
      "ogImage",
      "featured",
      "order",
      "createdAt",
      "updatedAt",
    ].join(" ");

    const query = slug
      ? Project.findOne(filter).select(fields).lean()
      : Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 }).select(fields).lean();
    const data = await query;

    return NextResponse.json(data ?? (slug ? null : []), {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800" },
    });
  }

  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(projects, {
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
    const client = text(form, "client");
    if (!name || !client) {
      return NextResponse.json({ error: "Vui lòng nhập tên dự án và khách hàng" }, { status: 400 });
    }

    const thumbnail = form.get("thumbnail") as File | null;
    const imagePath = await uploadImage(thumbnail, "projects");

    const galleryUrls: string[] = [];
    for (const file of form.getAll("gallery") as File[]) {
      const url = await uploadImage(file, "projects/gallery");
      if (url) galleryUrls.push(url);
    }

    const slug = text(form, "slug") || generateSlug(name);
    const newProject = await Project.create({
      name,
      client,
      slug,
      category: text(form, "category"),
      industry: text(form, "industry"),
      status: text(form, "status", "Đang triển khai") || "Đang triển khai",
      visibility: text(form, "visibility") === "draft" ? "draft" : "published",
      priority: ["low", "medium", "high"].includes(text(form, "priority")) ? text(form, "priority") : "medium",
      budget: number(form, "budget"),
      progress: Math.max(0, Math.min(100, number(form, "progress"))),
      summary: text(form, "summary").slice(0, 240),
      content: sanitizeHtml(text(form, "content")),
      clientLogo: text(form, "clientLogo"),
      duration: text(form, "duration"),
      startDate: dateValue(form, "startDate"),
      endDate: dateValue(form, "endDate"),
      role: text(form, "role"),
      liveUrl: text(form, "liveUrl"),
      githubUrl: text(form, "githubUrl"),
      tags: array(form, "tags"),
      technologies: array(form, "technologies"),
      features: array(form, "features"),
      results: array(form, "results"),
      description: sanitizeHtml(text(form, "description")),
      image: imagePath,
      gallery: galleryUrls,
      seoTitle: text(form, "seoTitle").slice(0, 70),
      seoDescription: text(form, "seoDescription").slice(0, 170),
      ogImage: text(form, "ogImage"),
      featured: text(form, "featured") === "true",
      order: number(form, "order"),
    });

    await logActivity({
      actor: auth.user,
      action: "create",
      entity: "project",
      entityId: newProject._id.toString(),
      description: `Tạo dự án ${newProject.name}`,
      metadata: { slug: newProject.slug, visibility: newProject.visibility },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Không thể tạo dự án" }, { status: 500 });
  }
}
