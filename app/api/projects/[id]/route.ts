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

function dateValue(form: FormData, key: string, fallback?: Date) {
  if (!form.has(key)) return fallback;
  const value = text(form, key);
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
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

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  const project = await Project.findById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const { id } = await params;
    await connectDB();

    const currentProject = await Project.findById(id);
    if (!currentProject) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const form = await req.formData();
    const name = text(form, "name", currentProject.name);
    const thumbnail = form.get("thumbnail") as File | null;
    const uploadedImage = await uploadImage(thumbnail, "projects");

    const newGalleryUrls: string[] = [];
    for (const file of form.getAll("gallery") as File[]) {
      const url = await uploadImage(file, "projects/gallery");
      if (url) newGalleryUrls.push(url);
    }

    const existingGallery = array(form, "existingGallery", currentProject.gallery || []);
    const updateData = {
      name,
      client: text(form, "client", currentProject.client),
      slug: text(form, "slug") || (name !== currentProject.name ? generateSlug(name) : currentProject.slug),
      category: text(form, "category", currentProject.category || ""),
      industry: text(form, "industry", currentProject.industry || ""),
      status: text(form, "status", currentProject.status),
      visibility: text(form, "visibility", currentProject.visibility) === "draft" ? "draft" : "published",
      priority: ["low", "medium", "high"].includes(text(form, "priority", currentProject.priority)) ? text(form, "priority", currentProject.priority) : "medium",
      budget: number(form, "budget", currentProject.budget),
      progress: Math.max(0, Math.min(100, number(form, "progress", currentProject.progress))),
      summary: text(form, "summary", currentProject.summary || "").slice(0, 240),
      content: form.has("content") ? sanitizeHtml(text(form, "content")) : currentProject.content,
      clientLogo: text(form, "clientLogo", currentProject.clientLogo || ""),
      duration: text(form, "duration", currentProject.duration || ""),
      startDate: dateValue(form, "startDate", currentProject.startDate),
      endDate: dateValue(form, "endDate", currentProject.endDate),
      role: text(form, "role", currentProject.role || ""),
      liveUrl: text(form, "liveUrl", currentProject.liveUrl || ""),
      githubUrl: text(form, "githubUrl", currentProject.githubUrl || ""),
      tags: array(form, "tags", currentProject.tags || []),
      technologies: array(form, "technologies", currentProject.technologies || []),
      features: array(form, "features", currentProject.features || []),
      results: array(form, "results", currentProject.results || []),
      description: form.has("description") ? sanitizeHtml(text(form, "description")) : currentProject.description,
      image: uploadedImage || currentProject.image,
      gallery: [...existingGallery, ...newGalleryUrls],
      seoTitle: text(form, "seoTitle", currentProject.seoTitle || "").slice(0, 70),
      seoDescription: text(form, "seoDescription", currentProject.seoDescription || "").slice(0, 170),
      ogImage: text(form, "ogImage", currentProject.ogImage || ""),
      featured: form.has("featured") ? text(form, "featured") === "true" : currentProject.featured,
      order: number(form, "order", currentProject.order || 0),
    };

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });

    await logActivity({
      actor: auth.user,
      action: "update",
      entity: "project",
      entityId: id,
      description: `Cập nhật dự án ${updated?.name || currentProject.name}`,
      metadata: { slug: updated?.slug, visibility: updated?.visibility },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Không thể cập nhật dự án" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await params;
  await connectDB();

  const deleted = await Project.findByIdAndDelete(id);
  if (deleted) {
    await logActivity({
      actor: auth.user,
      action: "delete",
      entity: "project",
      entityId: id,
      description: `Xóa dự án ${deleted.name}`,
      metadata: { slug: deleted.slug },
    });
  }
  return NextResponse.json({ success: true });
}
