import AboutClient from "./AboutClient";
import { createMetadata } from "@/libs/seo";

export const metadata = createMetadata({
  title: "Lương Vinh — Independent Web Developer",
  description:
    "Tìm hiểu về Lương Vinh — lập trình viên web độc lập đứng sau VinhWorks, chuyên thiết kế và phát triển website với Next.js, React và TypeScript.",
  keywords: ["Lương Vinh", "VinhWorks", "freelance web developer", "lập trình viên Next.js", "thiết kế website Hạ Long"],
  path: "/about",
  type: "profile",
  image: "/me.jpg",
  imageAlt: "Lương Vinh — VinhWorks",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lương Vinh",
  url: "https://webgiare.id.vn/about",
  image: "https://webgiare.id.vn/me.jpg",
  jobTitle: "Independent Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hạ Long",
    addressRegion: "Quảng Ninh",
    addressCountry: "VN",
  },
  knowsAbout: ["Next.js", "React", "TypeScript", "UI/UX Design", "SEO", "Web Development"],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <AboutClient />
    </>
  );
}
