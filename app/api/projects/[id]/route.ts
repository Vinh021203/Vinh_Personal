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

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const project = await Project.findById(id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const { id } = await params;
    await connectDB();

    const form = await req.formData();

    // Lấy project hiện tại để đối chiếu dữ liệu cũ
    const currentProject = await Project.findById(id);
    if (!currentProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // --- Xử lý các trường Text ---
    // Nếu form gửi lên null/undefined, giữ nguyên giá trị cũ (currentProject)
    // Nếu form gửi chuỗi rỗng "", có thể bạn muốn xóa hoặc cập nhật thành rỗng -> tùy logic
    // Ở đây tôi ưu tiên: Nếu có gửi key thì update, nếu không gửi key thì giữ nguyên.
    // Tuy nhiên FormData luôn gửi string, nên ta cần check kỹ.

    const name = form.get("name") as string;
    const client = form.get("client") as string;
    const status = form.get("status") as string;
    const visibility = form.get("visibility") === "draft" ? "draft" : "published";
    const description = sanitizeHtml((form.get("description") as string) || "");

    // Tags: Xử lý mảng JSON
    const tagsRaw = form.get("tags") as string;
    const tags = tagsRaw ? JSON.parse(tagsRaw) : currentProject.tags;

    const budget = form.has("budget")
      ? Number(form.get("budget"))
      : currentProject.budget;
    const progress = form.has("progress")
      ? Number(form.get("progress"))
      : currentProject.progress;
    const priority =
      (form.get("priority") as string) || currentProject.priority;
    const liveUrl = (form.get("liveUrl") as string) || currentProject.liveUrl;
    const githubUrl =
      (form.get("githubUrl") as string) || currentProject.githubUrl;

    // --- Xử lý Thumbnail (Ảnh đại diện) ---
    const thumbnail = form.get("thumbnail") as File | null;
    let imagePath = currentProject.image; // Mặc định giữ ảnh cũ

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
      imagePath = uploadResult.secure_url; // Cập nhật ảnh mới
    }

    // --- Xử lý Gallery (Ảnh phụ) ---
    const galleryFiles = form.getAll("gallery") as File[];
    const newGalleryUrls: string[] = [];

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
          newGalleryUrls.push(uploadRes.secure_url);
        }
      }
    }

    // Merge gallery cũ + mới (hoặc thay thế tùy logic bạn muốn)
    // Ở đây là: Giữ lại gallery cũ và THÊM ảnh mới vào sau
    const updatedGallery = [
      ...(currentProject.gallery || []),
      ...newGalleryUrls,
    ];

    const updateData = {
      name: name || currentProject.name,
      client: client || currentProject.client,
      status: status || currentProject.status,
      visibility,
      tags,
      description: description || currentProject.description,
      slug: name ? generateSlug(name) : currentProject.slug, // Chỉ tạo slug mới nếu tên đổi
      budget,
      progress,
      priority,
      liveUrl,
      githubUrl,
      image: imagePath,
      gallery: updatedGallery,
    };

    const updated = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    await logActivity({ actor: auth.user, action: "update", entity: "project", entityId: id, description: `Cập nhật dự án ${updated?.name || currentProject.name}` });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { id } = await params;
  await connectDB();

  const deleted = await Project.findByIdAndDelete(id);
  if (deleted) await logActivity({ actor: auth.user, action: "delete", entity: "project", entityId: id, description: `Xóa dự án ${deleted.name}` });
  return NextResponse.json({ success: true });
}
