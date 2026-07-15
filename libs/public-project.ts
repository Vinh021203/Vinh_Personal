import { cache } from "react";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/Project";

export type PublicProject = {
  _id: string;
  name: string;
  slug: string;
  client: string;
  description?: string;
  content?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  technologies?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  liveUrl?: string;
  githubUrl?: string;
  budget?: number;
  progress?: number;
  priority?: "low" | "medium" | "high";
  status?: string;
  visibility?: "draft" | "published";
};

function serializeProject(project: any): PublicProject | null {
  if (!project) return null;

  return {
    _id: String(project._id),
    name: project.name,
    slug: project.slug,
    client: project.client,
    description: project.description || "",
    content: project.content || "",
    image: project.image || "",
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
    category: project.category || "",
    technologies: Array.isArray(project.technologies) ? project.technologies : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : "",
    updatedAt: project.updatedAt ? new Date(project.updatedAt).toISOString() : "",
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    budget: project.budget || 0,
    progress: project.progress || 0,
    priority: project.priority || "medium",
    status: project.status || "Hoàn thành",
    visibility: project.visibility || "published",
  };
}

export const getPublicProjectBySlug = cache(async (slug: string) => {
  await connectDB();
  const decodedSlug = decodeURIComponent(slug);
  const project = await Project.findOne({ slug: decodedSlug, visibility: { $ne: "draft" } })
    .select("name slug client description content image gallery category technologies tags createdAt updatedAt liveUrl githubUrl budget progress priority status visibility")
    .lean();

  return serializeProject(project);
});
