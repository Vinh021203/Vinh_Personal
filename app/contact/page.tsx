import { Suspense } from "react";
import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Liên hệ - VinhWorks | Tư vấn Giải pháp Số Miễn phí",
  description:
    "Liên hệ ngay với VinhWorks để nhận tư vấn thiết kế website, SEO và giải pháp công nghệ. Hỗ trợ 24/7, phản hồi nhanh chóng.",
  openGraph: {
    title: "Liên hệ - VinhWorks | Tư vấn Giải pháp Số Miễn phí",
    description:
      "Liên hệ ngay với VinhWorks để nhận tư vấn thiết kế website, SEO và giải pháp công nghệ.",
    url: "https://vinhworks.com/contact",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Liên hệ VinhWorks",
  description:
    "Trang liên hệ tư vấn dịch vụ thiết kế website và giải pháp công nghệ.",
  url: "https://vinhworks.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "VinhWorks",
    telephone: "0971-386-588",
    email: "luongvinh02122003@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hạ Long, Quảng Ninh",
      addressCountry: "VN",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin" />
          </div>
        }
      >
        <ContactClient />
      </Suspense>
    </>
  );
}
