'use client';

import { HeroSection } from '@/components/HeroSection';
import { ServiceSection } from '@/components/ServiceSection';
import { ProjectSection } from '@/components/ProjectSection';

export default function HomePage() {
  return (
    <main className="text-gray-900 bg-white">
      <HeroSection />
      <ServiceSection />
      <ProjectSection />
    </main>
  );
}
