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
    url: "https://www.aadhya-infotech.com/DevStore",
  },
  {
    slug: "gocart",
    name: "Go Cart",
    category: "SaaS Platform",
    status: "Live",
    tagline: "Web to App Builder — your Shopify store as a native app.",
    summary:
      "Turn your Shopify store into a branded Android and iOS app — with push notifications, automations, India-ready checkout and app analytics.",
    overview: [
      "Go Cart turns a merchant's Shopify storefront into a branded Android and iOS app. The app loads the live store, so every theme feature and installed Shopify app keeps working — and adds native extras on top: a bottom tab bar, a live cart badge, a promo banner with tap-to-copy coupons, and the merchant's own colours and splash screen.",
      "Merchants can send push notifications with images and deep links, schedule them and target audience segments. Automations cover welcome pushes, abandoned-cart reminders, order-shipped updates and back-in-stock alerts (the last three on the Pro plan). Checkout is India-ready — UPI apps such as GPay, PhonePe and Paytm and Indian payment gateways work inside the app — and built-in analytics track installs, app opens and push open rates.",
      "Plans are Basic at ₹1,499/month and Pro at ₹3,999/month; yearly billing charges 10 months (2 months free), and every plan starts with a 14-day free trial. Go Cart connects securely to Shopify over OAuth 2.0 and is built with Flutter, Node.js and MySQL by our team.",
    ],
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
          "Welcome push, abandoned-cart reminders, order-shipped updates and back-in-stock alerts (the last three on Pro).",
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
    url: "https://www.aadhya-infotech.com/GoCart/",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
