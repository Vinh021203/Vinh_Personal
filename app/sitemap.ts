import type { MetadataRoute } from "next";
import { connectDB } from "@/libs/mongodb";
import Project from "@/models/Project";

const BASE_URL = "https://webgiare.id.vn";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: .8 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: .9 },
  { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: .9 },
  { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: .8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: .7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const projects = await Project.find({ visibility: { $ne: "draft" } }, { slug: 1, updatedAt: 1, createdAt: 1 }).lean().limit(200);
    projectEntries = projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? project.createdAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: .7,
    }));
  } catch {
    // Sitemap tĩnh vẫn hoạt động nếu cơ sở dữ liệu tạm thời chưa sẵn sàng.
  }
  return [...STATIC_ROUTES, ...projectEntries];
}
