import type { Metadata } from "next";

export const SITE_URL = "https://webgiare.id.vn";
export const SITE_NAME = "VinhWorks";
export const DEFAULT_OG_IMAGE = "/vinhworks-og-dark-1200x630.jpg";
export const DEFAULT_DESCRIPTION =
  "Lương Vinh thiết kế và phát triển website, landing page, web application và trải nghiệm số tối ưu cho doanh nghiệp.";

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
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

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
