import { Suspense } from "react";
import HomeClient from "./HomeClient";
import { createMetadata, SITE_URL } from "@/libs/seo";
import LoadingSpinner from "@/components/LoadingSpinner";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Thiết kế Website & Giải pháp Số Chuyên nghiệp",
  description:
    "Dịch vụ thiết kế website trọn gói, lập trình Web App, UI/UX và giải pháp công nghệ tối ưu cho doanh nghiệp. Uy tín, chất lượng và tận tâm.",
  path: "/",
  keywords: [
    "thiết kế website",
    "lập trình web app",
    "landing page",
    "UI UX",
    "SEO website",
    "Lương Vinh",
    "VinhWorks",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "VinhWorks",
  image: `${SITE_URL}/me.jpg`,
  description: "Dịch vụ thiết kế website, lập trình Web App và UI/UX chuyên nghiệp.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hạ Long",
    addressRegion: "Quảng Ninh",
    addressCountry: "VN",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "22:00",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<LoadingSpinner fullScreen size="lg" label="Đang tải trang chủ" />}>
        <HomeClient />
      </Suspense>
    </>
  );
}
