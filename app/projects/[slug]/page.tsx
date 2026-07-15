import ProjectDetailClient from "./ProjectDetailClient";
import { getPublicProjectBySlug } from "@/libs/public-project";

export const revalidate = 300;

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  return <ProjectDetailClient initialProject={project} />;
}
