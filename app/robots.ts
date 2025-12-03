import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/settings/", "/profile/", "/api/"],
    },
    sitemap: "https://vinhwork.vercel.app/sitemap.xml",
  };
}
