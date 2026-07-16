import type { Metadata } from "next";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://vinhwork.vercel.app";

export const SITE_URL = rawSiteUrl.replace(/\/$/, "");
export const SITE_NAME = "VinhWorks";
export const DEFAULT_OG_IMAGE = "/vinhworks-og-dark-1200x630.jpg";
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE}`;
export const DEFAULT_DESCRIPTION =
  "Lương Vinh thiết kế website, landing page, web application và giải pháp số tối ưu cho doanh nghiệp.";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "profile" | "article";
  noIndex?: boolean;
};

const indexedRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  noarchive: true,
  nocache: true,
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function absoluteImageUrl(image = DEFAULT_OG_IMAGE) {
  return image.startsWith("http") ? image : absoluteUrl(image);
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt = title,
  type = "website",
  noIndex = false,
}: SeoOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteImageUrl(image);

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Lương Vinh", url: SITE_URL }],
    creator: "Lương Vinh",
    publisher: SITE_NAME,
    alternates: { canonical },
    robots: noIndex ? noIndexRobots : indexedRobots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}
