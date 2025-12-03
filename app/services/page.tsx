import { Suspense } from "react";
import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dịch vụ Thiết kế Website & App - VinhWorks | Giải pháp Công nghệ",
  description:
    "Dịch vụ thiết kế website chuyên nghiệp, lập trình Web App và tối ưu SEO. Giải pháp chuyển đổi số toàn diện cho doanh nghiệp.",
  keywords: [
    "thiết kế website",
    "lập trình web app",
    "dịch vụ seo",
    "nextjs development",
    "vinhworks services",
  ],
  openGraph: {
    title: "Dịch vụ Công nghệ Đột phá - VinhWorks",
    description:
      "Kiến tạo cỗ máy tăng trưởng doanh thu cho doanh nghiệp của bạn.",
    url: "https://vinhworks.com/services",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Services",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development",
  provider: {
    "@type": "Organization",
    name: "VinhWorks",
    url: "https://vinhworks.com",
  },
  areaServed: "Vietnam",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design",
          description:
            "Thiết kế giao diện độc quyền, sáng tạo, tập trung vào nhận diện thương hiệu.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce Solution",
          description: "Hệ thống bán hàng online đa kênh tích hợp thanh toán.",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-schema"
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
        <ServicesClient />
      </Suspense>
    </>
  );
}
