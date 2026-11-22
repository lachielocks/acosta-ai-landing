import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const pages = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/pause", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/policies", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/safety", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/enterprise-terms", changeFrequency: "monthly" as const, priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
