import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = ["", "/services", "/portfolio", "/about", "/blog", "/contact", "/careers"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
