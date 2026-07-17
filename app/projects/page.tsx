import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Dự án Website đã thực hiện",
  description:
    "Portfolio website, landing page và web application do Lương Vinh trực tiếp thiết kế, phát triển và bàn giao.",
  path: "/projects",
  keywords: ["portfolio website", "dự án website", "landing page", "web application", "Lương Vinh"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dự án của Lương Vinh",
  description: "Danh sách website và sản phẩm số do Lương Vinh thực hiện.",
  url: "https://vinhwork.io.vn/projects",
  author: { "@type": "Person", name: "Lương Vinh", url: "https://vinhwork.io.vn" },
};

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#fff8e9]" />}>
        <ProjectsClient />
      </Suspense>
    </>
  );
}
