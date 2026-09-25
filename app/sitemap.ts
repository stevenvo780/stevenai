import type { MetadataRoute } from "next";
import { components } from "@/lib/components-data";

const BASE = "https://daimon.stevenvallejo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time lastmod (WAVE3 SEO P2). No per-component dates in data — shared stamp.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE + "/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: BASE + "/architecture",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const componentRoutes: MetadataRoute.Sitemap = components.map((c) => ({
    url: `${BASE}/components/${c.key}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...componentRoutes];
}
