import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Per-page metadata: title, description, canonical URL and matching Open Graph /
 * Twitter tags. Next.js replaces (it does not merge) the layout's `openGraph` and
 * `twitter` objects when a page sets its own, so the shared fields are repeated here —
 * otherwise every page would be shared with the home page's title and URL.
 */
export type PageImage = {
  /** Site-relative path under public/, e.g. "/videos/go-cart-demo.jpg". */
  url: string;
  width: number;
  height: number;
  alt: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/products/gocart". Resolved against `metadataBase`. */
  path: string;
  /**
   * Preview image for link shares (og:image / twitter:image). Pages without one get the
   * small "summary" Twitter card — there is no site-wide share image yet.
   */
  image?: PageImage;
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
      ...(image ? { images: [image] } : {}),
    },
    twitter: image
      ? { card: "summary_large_image", title: fullTitle, description, images: [image] }
      : { card: "summary", title: fullTitle, description },
    ...(noIndex ? { robots: { index: false } } : {}),
  };
}
