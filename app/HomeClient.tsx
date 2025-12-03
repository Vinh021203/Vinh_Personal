"use client";

import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { ProjectSection } from "@/components/ProjectSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ProcessSection } from "@/components/ProcessSection";
import { FAQSection } from "@/components/FAQSection";

export default function HomeClient() {
  return (
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
    </main>
  );
}
