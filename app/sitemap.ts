import type { MetadataRoute } from "next";
import { connectDB } from "@/libs/mongodb";
import { SITE_URL } from "@/libs/seo";
import Project from "@/models/Project";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectEntries: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    const projects = await Project.find(
      { visibility: { $ne: "draft" } },
      { slug: 1, updatedAt: 1, createdAt: 1 },
    )
      .lean()
      .limit(200);

    projectEntries = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? project.createdAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Sitemap tĩnh vẫn hoạt động nếu database tạm thời chưa sẵn sàng.
  }

  return [...STATIC_ROUTES, ...projectEntries];
}
