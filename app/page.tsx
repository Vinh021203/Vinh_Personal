import { Suspense } from "react";
import { Metadata } from "next";
import HomeClient from "./HomeClient";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VinhWorks - Thiết kế Website & Giải pháp Số Chuyên nghiệp",
  description:
    "Dịch vụ thiết kế website trọn gói, lập trình Web App, UI/UX và giải pháp công nghệ tối ưu cho doanh nghiệp. Uy tín - Chất lượng - Tận tâm.",
  openGraph: {
    title: "VinhWorks - Đối tác Công nghệ Tin cậy",
    description:
      "Biến ý tưởng thành hiện thực với dịch vụ thiết kế website và phần mềm chất lượng cao.",
    url: "https://vinhworks.com",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Homepage",
      },
    ],
  },
  alternates: {
    canonical: "https://vinhworks.com",
  },
};

// 2. Schema JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VinhWorks",
  image: "https://vinhworks.com/logo.png",
  description:
    "Dịch vụ thiết kế website, lập trình Web App và UI/UX chuyên nghiệp.",
  url: "https://vinhworks.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hạ Long",
    addressRegion: "Quảng Ninh",
    addressCountry: "VN",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "22:00",
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="json-ld"
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
        <HomeClient />
      </Suspense>
    </>
  );
}
