import ServicesClient from "./ServicesClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Dịch vụ thiết kế & phát triển Website",
  description:
    "Dịch vụ thiết kế website, phát triển web app, UI/UX và tối ưu SEO do Lương Vinh trực tiếp thực hiện với Next.js, React và TypeScript.",
  keywords: ["thiết kế website", "lập trình web app", "Next.js developer", "UI UX", "SEO website", "Lương Vinh"],
  path: "/services",
});

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design and Development",
  provider: { "@type": "Person", name: "Lương Vinh", url: "https://vinhwork.io.vn/about" },
  areaServed: "Vietnam",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dịch vụ Web",
    itemListElement: ["Thiết kế website", "Phát triển Web App", "UI/UX Design", "SEO & Performance"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicesClient />
    </>
  );
}
