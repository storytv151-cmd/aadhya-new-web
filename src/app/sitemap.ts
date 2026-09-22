import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Indexable pages only (/terms is noindex). /GoCart is this site's Go Cart landing page;
// the separately hosted apps (/DevStore, and the Go Cart dashboard + API under /GoCart/app
// and /GoCart/api) are not part of this site and are deliberately not listed.
const routes = [
  "",
  "/services",
  "/products",
  "/GoCart",
  "/portfolio",
  "/about",
  "/blog",
  "/contact",
  "/careers",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
