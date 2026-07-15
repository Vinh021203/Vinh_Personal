"use client";

import { HeroSection } from "@/components/HeroSection";
import { ServiceSection } from "@/components/ServiceSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectSection } from "@/components/ProjectSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FAQSection } from "@/components/FAQSection";

export default function HomeClient() {
  return (
    <main className="boston-home min-h-screen bg-white text-zinc-950 selection:bg-amber-200 selection:text-zinc-950">
      <HeroSection />
      <ServiceSection />
      <ProcessSection />
      <ProjectSection />
      <TestimonialSection />
      <FAQSection />
    </main>
  );
}
