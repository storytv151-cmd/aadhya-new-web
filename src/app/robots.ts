import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Crawlers only read robots.txt at the root of the host, so this file also speaks for the
// other apps served on it: the Go Cart dashboard + API (/GoCart/app, /GoCart/api) and the
// DevStore storefront (/DevStore — its own /DevStore/robots.txt is never read). DevStore's
// sitemap is listed next to this site's.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/GoCart/app/",
        "/GoCart/api/",
        "/GoCartNative/api/",
        "/DevStore/dashboard",
        "/DevStore/api/",
      ],
    },
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/DevStore/sitemap.xml`],
    host: siteConfig.url,
  };
}
