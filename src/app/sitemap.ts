import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { siteConfig } from "@/lib/site";

// Indexable pages only (privacy/terms are noindex). The separately hosted apps under
// /GoCart and /DevStore are not part of this site and are deliberately not listed.
const routes = [
  "",
  "/services",
  "/products",
  ...products.map((product) => `/products/${product.slug}`),
  "/portfolio",
  "/about",
  "/blog",
  "/contact",
  "/careers",
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
