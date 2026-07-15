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
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// --- GET: Lấy danh sách dự án ---
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isPublic = searchParams.get("public") === "1";
  const slug = searchParams.get("slug");

  if (isPublic) {
    const filter: Record<string, unknown> = { visibility: { $ne: "draft" } };
    if (slug) filter.slug = slug;

    const fields =
      "name slug client status priority budget progress liveUrl image gallery description tags technologies category createdAt updatedAt featured";
    const query = slug ? Project.findOne(filter).select(fields).lean() : Project.find(filter).sort({ createdAt: -1 }).select(fields).lean();
    const data = await query;
    return NextResponse.json(data ?? (slug ? null : []), {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
      },
    });
  }

  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(projects, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

// --- POST: Tạo dự án mới ---
export async function POST(req: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    await connectDB();
    const form = await req.formData();

    const name = form.get("name") as string;
    const client = form.get("client") as string;
    const status = form.get("status") as string;
    const visibility = form.get("visibility") === "draft" ? "draft" : "published";
    const tags = JSON.parse((form.get("tags") as string) || "[]");
    const description = sanitizeHtml((form.get("description") as string) || "");

    // Các trường mới
    const budget = Number(form.get("budget")) || 0;
    const progress = Number(form.get("progress")) || 0;
    const priority = (form.get("priority") as string) || "medium";
    const liveUrl = (form.get("liveUrl") as string) || "";
    const githubUrl = (form.get("githubUrl") as string) || "";

    // --- Xử lý Thumbnail (Ảnh đại diện) ---
    const thumbnail = form.get("thumbnail") as File | null;
    let imagePath = "";

    if (thumbnail && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        }
      );
      imagePath = uploadResult.secure_url;
    }

    // --- Xử lý Gallery (Ảnh phụ - Nhiều ảnh) ---
    // Lưu ý: Ở Frontend cần append cùng key 'gallery' nhiều lần
    const galleryFiles = form.getAll("gallery") as File[];
    const galleryUrls: string[] = [];

    if (galleryFiles && galleryFiles.length > 0) {
      for (const file of galleryFiles) {
        if (file instanceof File && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const uploadRes = await new Promise<{ secure_url: string }>(
            (resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "projects/gallery" },
                (error, result) => {
                  if (error || !result) reject(error);
                  else resolve(result);
                }
              );
              stream.end(buffer);
            }
          );
          galleryUrls.push(uploadRes.secure_url);
        }
      }
    }

    const newProject = new Project({
      name,
      client,
      slug: generateSlug(name),
      status,
      visibility,
      priority,
      budget,
      progress,
      liveUrl,
      githubUrl,
      tags,
      description,
      image: imagePath,
      gallery: galleryUrls, // Lưu mảng URL gallery
    });

    await newProject.save();
    await logActivity({ actor: auth.user, action: "create", entity: "project", entityId: newProject._id.toString(), description: `Tạo dự án ${newProject.name}` });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
