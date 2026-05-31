import { MetadataRoute } from "next";
import { connectDB } from "@/libs/mongodb";
import Post from "@/models/Post";
import Project from "@/models/Project";

const BASE_URL = "https://vinhworks.com";

// Các static route và cấu hình SEO tương ứng
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: `${BASE_URL}/pricing`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Dynamic: Blog posts ──────────────────────────────────────
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const posts = await Post.find({}, { slug: 1, updatedAt: 1, createdAt: 1 })
      .lean()
      .limit(200);

    blogEntries = posts.map((post: any) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    // Nếu DB chưa sẵn sàng, bỏ qua dynamic blog entries
  }

  // ── Dynamic: Projects ────────────────────────────────────────
  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const projects = await Project.find(
      {},
      { slug: 1, updatedAt: 1, createdAt: 1 }
    )
      .lean()
      .limit(200);

    projectEntries = projects.map((project: any) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? project.createdAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Nếu DB lỗi, bỏ qua dynamic project entries
  }

  return [...STATIC_ROUTES, ...blogEntries, ...projectEntries];
}
