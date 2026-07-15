import { cache } from "react";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/Project";

export type PublicProject = {
  _id: string;
  name: string;
  slug: string;
  client: string;
  summary?: string;
  description?: string;
  content?: string;
  image?: string;
  gallery?: string[];
  category?: string;
  industry?: string;
  clientLogo?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  technologies?: string[];
  tags?: string[];
  features?: string[];
  results?: string[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  featured?: boolean;
  order?: number;
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
    summary: project.summary || "",
    description: project.description || "",
    content: project.content || "",
    image: project.image || "",
    gallery: Array.isArray(project.gallery) ? project.gallery : [],
    category: project.category || "",
    industry: project.industry || "",
    clientLogo: project.clientLogo || "",
    duration: project.duration || "",
    startDate: project.startDate ? new Date(project.startDate).toISOString() : "",
    endDate: project.endDate ? new Date(project.endDate).toISOString() : "",
    role: project.role || "",
    technologies: Array.isArray(project.technologies) ? project.technologies : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
    features: Array.isArray(project.features) ? project.features : [],
    results: Array.isArray(project.results) ? project.results : [],
    seoTitle: project.seoTitle || "",
    seoDescription: project.seoDescription || "",
    ogImage: project.ogImage || "",
    featured: Boolean(project.featured),
    order: project.order || 0,
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
    .select(
      "name slug client summary description content image gallery category industry clientLogo duration startDate endDate role technologies tags features results seoTitle seoDescription ogImage featured order createdAt updatedAt liveUrl githubUrl budget progress priority status visibility",
    )
    .lean();

  return serializeProject(project);
});
