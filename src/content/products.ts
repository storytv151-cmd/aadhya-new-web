/**
 * Aadhya Infotech's own software products (distinct from client portfolio work).
 * The single source of truth for the "Products" nav dropdown, the /products listing
 * and the home "Our products" section — every one of them links straight to the
 * product (`href`). Add a new object here to publish a product.
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
  features: ProductFeature[];
  stack: string[];
  /** Where the product lives — a site-relative path on this domain. */
  href: string;
  /**
   * True when `href` is served by another app on this domain (not this Next app), so
   * links must be a plain <a> (full page load) — next/link would route it client-side
   * inside this app and 404.
   */
  external: boolean;
  /** Label for the product's primary call to action. */
  cta: string;
};

export const products: Product[] = [
  {
    slug: "gocart",
    name: "Go Cart",
    category: "SaaS Platform",
    status: "Live",
    tagline: "Web to App Builder — your Shopify store as a mobile app.",
    summary:
      "Turn your Shopify store into a branded Android and iOS app — with push notifications, automations, India-ready checkout and app analytics.",
    features: [
      {
        icon: "tablet-smartphone",
        title: "Your store, as an app",
        description:
          "A branded Android and iOS app that loads your live Shopify store — every theme feature and app keeps working.",
      },
      {
        icon: "bell-ring",
        title: "Push notifications",
        description:
          "Rich pushes with images and deep links, scheduling and audience segments.",
      },
      {
        icon: "zap",
        title: "Automations",
        description:
          "Welcome push, abandoned-cart reminders, order-shipped updates and back-in-stock alerts (the last three on WebView Growth).",
      },
      {
        icon: "indian-rupee",
        title: "India-ready checkout",
        description:
          "UPI apps (GPay, PhonePe, Paytm…) and Indian payment gateways work inside the app.",
      },
      {
        icon: "palette",
        title: "Native extras",
        description:
          "Bottom tab bar, live cart badge, promo banner with tap-to-copy coupon, your colours and splash screen.",
      },
      {
        icon: "chart-column",
        title: "App analytics",
        description: "Track installs, app opens and push open rates.",
      },
    ],
    stack: ["Flutter", "Node.js", "MySQL", "Shopify OAuth 2.0"],
    // The Go Cart landing page is part of this site (app/(frontend)/GoCart).
    href: "/GoCart",
    external: false,
    cta: "Explore Go Cart",
  },
  {
    slug: "devstore",
    name: "DevStore",
    category: "SaaS Platform",
    status: "Live",
    tagline: "Developer products, ready to ship.",
    summary:
      "Our single-vendor storefront platform for premium templates, UI kits and starter projects — with license keys, versioned releases and lifetime updates.",
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
    // DevStore is a separate app served on this domain.
    href: "/DevStore",
    external: true,
    cta: "Visit DevStore",
  },
];
