import { Suspense } from "react";
import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dự Án Tiêu Biểu | VinhWorks Portfolio",
  description:
    "Tổng hợp các dự án thiết kế Website, E-commerce, Web App và Mobile App thực tế đã được VinhWorks triển khai thành công cho khách hàng.",
  keywords: [
    "dự án vinhworks",
    "portfolio thiết kế web",
    "mẫu website đẹp",
    "dự án phần mềm",
    "khách hàng vinhworks",
  ],
  openGraph: {
    title: "Khám Phá Portfolio Sáng Tạo Của VinhWorks",
    description:
      "Hơn 100+ dự án thành công. Xem cách chúng tôi giải quyết bài toán kinh doanh qua công nghệ.",
    url: "https://vinhworks.com/projects",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio dự án VinhWorks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dự Án Tiêu Biểu | VinhWorks",
    images: ["https://vinhworks.com/og-projects.jpg"],
  },
  alternates: {
    canonical: "https://vinhworks.com/projects",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dự án tiêu biểu VinhWorks",
  description: "Danh sách các dự án công nghệ và website đã thực hiện.",
  url: "https://vinhworks.com/projects",
  provider: {
    "@type": "Organization",
    name: "VinhWorks",
    url: "https://vinhworks.com",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Thiết kế Website Doanh nghiệp",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Giải pháp E-commerce",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Phát triển Web Application",
      },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Script
        id="projects-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-12 h-12 border-4 rounded-full border-violet-200 border-t-violet-600 animate-spin" />
          </div>
        }
      >
        <ProjectsClient />
      </Suspense>
    </>
  );
}
