import type { MetadataRoute } from "next";
import { components } from "@/lib/components-data";

const BASE = "https://daimon.stevenvallejo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE + "/",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: BASE + "/architecture",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const componentRoutes: MetadataRoute.Sitemap = components.map((c) => ({
    url: `${BASE}/components/${c.key}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...componentRoutes];
}
