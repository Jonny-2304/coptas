import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/team`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/papers`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
