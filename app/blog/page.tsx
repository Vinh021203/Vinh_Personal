import { Suspense } from "react";
import BlogClient from "./BlogClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Kiến thức - VinhWorks",
  description:
    "Chia sẻ kiến thức lập trình, thiết kế web và xu hướng công nghệ mới nhất. Cập nhật hướng dẫn, tutorial và tài nguyên miễn phí.",
  openGraph: {
    title: "Blog & Kiến thức - VinhWorks",
    description:
      "Chia sẻ kiến thức lập trình, thiết kế web và xu hướng công nghệ mới nhất.",
    url: "https://vinhworks.com/blog",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog VinhWorks",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog Công nghệ VinhWorks",
  url: "https://vinhworks.com/blog",
  description:
    "Chia sẻ kiến thức lập trình, thiết kế web và xu hướng công nghệ mới nhất.",
  publisher: {
    "@type": "Organization",
    name: "VinhWorks",
    logo: {
      "@type": "ImageObject",
      url: "https://vinhworks.com/logo.png",
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 rounded-full border-violet-200 border-t-violet-600 animate-spin" />
          </div>
        }
      >
        <BlogClient />
      </Suspense>
    </>
  );
}
