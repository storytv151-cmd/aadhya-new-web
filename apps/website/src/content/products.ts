/**
 * Aadhya Infotech's own software products (distinct from client portfolio work).
 * The single source of truth for the "Products" nav dropdown, the /products listing
 * and each /products/[slug] detail page. Add a new object here to publish a product.
 */

export type ProductFeature = {
  /** lucide icon name, resolved via components/sections/icon-map. */
  icon: string;
  title: string;
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  /** e.g. "SaaS Platform" — shown as a small badge. */
  category: string;
  /** "Live" | "Beta" | "Coming soon" — availability badge. */
  status: string;
  /** Short one-liner for the menu + hero. */
  tagline: string;
  /** One-paragraph teaser for cards. */
  summary: string;
  /** Longer detail copy for the product page. */
  overview: string[];
  features: ProductFeature[];
  stack: string[];
  /** Live product URL. */
  url: string;
};

export const products: Product[] = [
  {
    slug: "devstore",
    name: "DevStore",
    category: "SaaS Platform",
    status: "Live",
    tagline: "Developer products, ready to ship.",
    summary:
      "Our single-vendor storefront platform for premium templates, UI kits and starter projects — with license keys, versioned releases and lifetime updates.",
    overview: [
      "DevStore is Aadhya Infotech's flagship product: a single-vendor storefront where one owner and their team sell premium developer products — templates, UI kits and production-ready starter projects.",
      "It ships with everything a modern digital-product business needs: enterprise role-based access control, passwordless magic-link authentication, license-key delivery with versioned releases and lifetime updates, and a full admin suite for products, coupons, reviews, support and analytics.",
      "Built on a modern, proven stack — Next.js, NestJS, PostgreSQL and Redis — and designed, built and maintained end-to-end by our team.",
    ],
    features: [
      {
        icon: "shield-check",
        title: "Enterprise RBAC",
        description: "One owner, unlimited staff — governed by granular roles and permissions.",
      },
      {
        icon: "key-round",
        title: "Passwordless auth",
        description: "Secure magic-link sign-in for staff and customers. No passwords to leak.",
      },
      {
        icon: "ticket-percent",
        title: "Licensing & releases",
        description: "License keys, versioned releases and lifetime updates, out of the box.",
      },
      {
        icon: "layout-dashboard",
        title: "Full admin suite",
        description: "Products, coupons, reviews, support and analytics in one dashboard.",
      },
    ],
    stack: ["Next.js 15", "NestJS", "PostgreSQL", "Prisma", "Redis"],
    url: "https://devstore.aadhya-infotech.com",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
