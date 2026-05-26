import type { MetadataRoute } from "next";
import { getProperties, getAreaGuides, getBlogPosts } from "@/lib/data";

import { getSiteUrl } from "@/lib/site-url";

const BASE = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, areaGuides, blogPosts] = await Promise.all([
    getProperties(),
    getAreaGuides(),
    getBlogPosts(),
  ]);
  const staticPages = [
    "",
    "/about",
    "/valuation",
    "/landlords",
    "/buyers",
    "/tenants",
    "/contact",
    "/properties/for-sale",
    "/properties/to-rent",
    "/privacy",
    "/terms",
    "/blog",
  ];

  const areaPages = areaGuides.map((a) => `/areas/${a.slug}`);

  const salePages = properties
    .filter((p) => p.type === "sale")
    .map((p) => `/properties/for-sale/${p.slug}`);

  const letPages = properties
    .filter((p) => p.type === "let")
    .map((p) => `/properties/to-rent/${p.slug}`);

  const blogPages = blogPosts.map((p) => `/blog/${p.slug}`);

  return [...staticPages, ...areaPages, ...salePages, ...letPages, ...blogPages].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: path.includes("properties") ? "daily" as const : "weekly" as const,
      priority: path === "" ? 1 : path.includes("properties") ? 0.8 : 0.6,
    })
  );
}
