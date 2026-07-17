import PricingClient from "./PricingClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Bảng giá thiết kế Website",
  description:
    "Bảng giá tham khảo cho Landing Page, website doanh nghiệp và Web App. Phạm vi rõ ràng, so sánh chi tiết và báo giá theo nhu cầu thực tế.",
  keywords: ["bảng giá website", "giá thiết kế landing page", "giá website doanh nghiệp", "Lương Vinh", "VinhWorks"],
  path: "/pricing",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Thiết kế và phát triển Website",
  provider: { "@type": "Person", name: "Lương Vinh", url: "https://vinhwork.io.vn/about" },
  areaServed: "VN",
  offers: { "@type": "AggregateOffer", priceCurrency: "VND", lowPrice: "5000000", offerCount: "3" },
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PricingClient />
    </>
  );
}
