"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/HeroSection";

const ServiceSection = dynamic(
  () => import("@/components/ServiceSection").then((mod) => mod.ServiceSection),
  { ssr: false },
);
const ProcessSection = dynamic(
  () => import("@/components/ProcessSection").then((mod) => mod.ProcessSection),
  { ssr: false },
);
const ProjectSection = dynamic(
  () => import("@/components/ProjectSection").then((mod) => mod.ProjectSection),
  { ssr: false },
);
const TestimonialSection = dynamic(
  () =>
    import("@/components/TestimonialSection").then(
      (mod) => mod.TestimonialSection,
    ),
  { ssr: false },
);
const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((mod) => mod.FAQSection),
  { ssr: false },
);

export default function HomeClient() {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    const loadSections = () => setShowDeferredSections(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadSections, {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = globalThis.setTimeout(loadSections, 600);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <HeroSection />

      {showDeferredSections && (
        <>
          <ServiceSection />
          <ProcessSection />
          <ProjectSection />
          <TestimonialSection />
          <FAQSection />
        </>
      )}
    </main>
  );
}
