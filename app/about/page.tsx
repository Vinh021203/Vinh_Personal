import { Suspense } from "react";
import { Metadata } from "next";
import AboutClient from "./AboutClient";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Về VinhWorks | Hành trình Sáng tạo & Công nghệ Đột phá",
  description:
    "Khám phá câu chuyện của VinhWorks - Đội ngũ chuyên gia tâm huyết cung cấp giải pháp thiết kế website, phần mềm và chuyển đổi số toàn diện.",
  keywords: [
    "về vinhworks",
    "đội ngũ vinhworks",
    "công ty phần mềm",
    "thiết kế website uy tín",
    "giá trị cốt lõi vinhworks",
  ],
  authors: [{ name: "VinhWorks Team", url: "https://vinhworks.com" }],
  openGraph: {
    title: "VinhWorks - Nơi Nghệ Thuật Gặp Gỡ Công Nghệ",
    description:
      "Chúng tôi không chỉ viết code, chúng tôi kiến tạo giải pháp số giúp doanh nghiệp bứt phá.",
    url: "https://vinhworks.com/about",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Đội ngũ VinhWorks năng động",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Về VinhWorks | Đối tác Công nghệ Tin cậy",
    description: "Hành trình từ ý tưởng đến hiện thực số hóa.",
    images: ["https://vinhworks.com/og-about.jpg"],
  },
  alternates: {
    canonical: "https://vinhworks.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VinhWorks",
  url: "https://vinhworks.com",
  logo: "https://vinhworks.com/logo.png",
  description:
    "Công ty cung cấp giải pháp thiết kế website và phần mềm chuyên nghiệp.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+84-123-456-789",
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: "Vietnamese",
  },
  sameAs: [
    "https://www.facebook.com/vinhworks",
    "https://www.linkedin.com/company/vinhworks",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-jsonld"
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
        <AboutClient />
      </Suspense>
    </>
  );
}
