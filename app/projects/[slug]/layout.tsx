import type { Metadata } from "next";
import { createMetadata, SITE_URL } from "@/libs/seo";
import { getPublicProjectBySlug } from "@/libs/public-project";

const clean = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await getPublicProjectBySlug(slug);

    if (!project) {
      return createMetadata({
        title: "Không tìm thấy dự án",
        description: "Dự án không tồn tại, chưa được công khai hoặc đã được thay đổi.",
        path: `/projects/${slug}`,
        noIndex: true,
      });
    }

    const description =
      project.seoDescription ||
      clean(project.summary || project.description).slice(0, 158) ||
      `Khám phá dự án ${project.name} do Lương Vinh thiết kế và phát triển.`;

    return createMetadata({
      title: project.seoTitle || `${project.name} | Dự án`,
      description,
      path: `/projects/${project.slug}`,
      image: project.ogImage || project.image || "/vinhworks-og-dark-1200x630.jpg",
      imageAlt: `${project.name} — VinhWorks`,
      keywords: [project.name, project.client, project.category || "", project.industry || "", ...(project.tags || []), ...(project.technologies || []), "dự án website", "Lương Vinh"].filter(Boolean),
    });
  } catch {
    return createMetadata({
      title: "Chi tiết dự án",
      description: "Khám phá dự án website do Lương Vinh thực hiện.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }
}

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let schema: Record<string, unknown> | null = null;

  try {
    const project = await getPublicProjectBySlug(slug);

    if (project) {
      schema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        description: clean(project.summary || project.description),
        url: `${SITE_URL}/projects/${project.slug}`,
        image: project.ogImage || project.image,
        creator: { "@type": "Person", name: "Lương Vinh", url: SITE_URL },
        about: project.tags || [],
        dateCreated: project.createdAt,
        dateModified: project.updatedAt,
      };
    }
  } catch {
    // Trang vẫn render được nếu metadata/schema tạm thời không tải được.
  }

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      {children}
    </>
  );
}
