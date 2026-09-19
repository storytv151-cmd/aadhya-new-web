import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Per-page metadata: title, description, canonical URL and matching Open Graph /
 * Twitter tags. Next.js replaces (it does not merge) the layout's `openGraph` and
 * `twitter` objects when a page sets its own, so the shared fields are repeated here —
 * otherwise every page would be shared with the home page's title and URL.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/products/gocart". Resolved against `metadataBase`. */
  path: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} — ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false } } : {}),
  };
}
