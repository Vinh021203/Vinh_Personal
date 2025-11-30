"use client";

import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { ProjectSection } from "@/components/ProjectSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";
import Script from "next/script";

export default function HomePage() {
  // Schema JSON-LD cho SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VinhWorks",
    image: "https://vinhworks.com/logo.png", // Thay link logo thật của bạn
    description:
      "Dịch vụ thiết kế website, lập trình Web App và UI/UX chuyên nghiệp.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quảng Ninh",
      addressCountry: "VN",
    },
    priceRange: "$$",
  };

  return (
    <>
      {/* Inject Schema SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        {/* 1. Hero: Gây ấn tượng ban đầu */}
        <HeroSection />

        {/* 2. Services: Bạn làm được gì? */}
        <ServiceSection />

        {/* 3. Process: Cách bạn làm việc (Tăng độ uy tín) */}
        <ProcessSection />

        {/* 4. Projects: Bằng chứng năng lực */}
        <ProjectSection />

        {/* 5. Testimonials: Khách hàng nói gì (Social Proof) */}
        <TestimonialSection />

        {/* 6. FAQ: Xử lý từ chối & SEO từ khóa */}
        <FAQSection />

        {/* Lưu ý: ProjectSection và ServiceSection đã có CTA button rồi, 
            nhưng nếu muốn bạn có thể thêm 1 section CTA riêng biệt ở đây 
            trước khi hết trang */}
      </main>
    </>
  );
}
