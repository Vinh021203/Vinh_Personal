import { Suspense } from "react";
import ContactClient from "./ContactClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Liên hệ Lương Vinh — Tư vấn Website",
  description:
    "Trao đổi trực tiếp với Lương Vinh về thiết kế website, landing page, web application, UI/UX và tối ưu hiệu năng.",
  path: "/contact",
  keywords: ["liên hệ thiết kế website", "tư vấn website", "báo giá website", "Lương Vinh"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Liên hệ Lương Vinh",
  url: "https://vinhwork.io.vn/contact",
  mainEntity: {
    "@type": "Person",
    name: "Lương Vinh",
    telephone: "+84971386588",
    email: "contact@vinhwork.io.vn",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hạ Long",
      addressRegion: "Quảng Ninh",
      addressCountry: "VN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#fff8e9]" />}>
        <ContactClient />
      </Suspense>
    </>
  );
}
