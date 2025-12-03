import { Suspense } from "react";
import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bảng giá - VinhWorks | Minh bạch & Hiệu quả",
  description:
    "Bảng giá dịch vụ thiết kế website trọn gói, minh bạch, không phát sinh chi phí. Các gói dịch vụ từ Cơ bản đến Cao cấp phù hợp mọi nhu cầu.",
  openGraph: {
    title: "Bảng giá Dịch vụ VinhWorks",
    description:
      "Xem chi tiết bảng giá thiết kế website và giải pháp phần mềm.",
    url: "https://vinhworks.com/pricing",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  priceCurrency: "VND",
  minPrice: "5000000",
  maxPrice: "15000000",
  description: "Bảng giá dịch vụ thiết kế website trọn gói tại VinhWorks",
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-12 h-12 border-4 border-purple-200 rounded-full border-t-purple-600 animate-spin" />
          </div>
        }
      >
        <PricingClient />
      </Suspense>
    </>
  );
}
