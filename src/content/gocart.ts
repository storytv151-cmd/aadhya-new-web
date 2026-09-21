import type { Faq } from "@/types";
import type { ProductFeature } from "./products";

/**
 * Copy for the Go Cart landing page (/GoCart). Every claim here must be provable from
 * the product itself: no usage numbers, percentages or customer logos, and testimonials
 * only from real stores that agreed to be quoted (goCartReviews).
 * `icon` values are lucide icon names resolved via components/sections/icon-map.
 */

/** The Go Cart dashboard is a separate app on this domain — link with a plain <a>. */
export const goCartLinks = {
  register: "/GoCart/app/register",
  login: "/GoCart/app/login",
} as const;

export const goCartTrust = ["Android & iOS apps", "No commission on your sales", "Preview on your phone first"];

export type GoCartStep = ProductFeature & { points: string[] };

export const goCartSteps: GoCartStep[] = [
  {
    icon: "plug",
    title: "Connect your Shopify store",
    description:
      "Sign up and connect your store through Shopify's secure OAuth. Your app runs on the store you already have, so there's nothing to migrate.",
    points: ["Secure OAuth", "Nothing to migrate"],
  },
  {
    icon: "palette",
    title: "Customise your app",
    description:
      "Make it yours from the Go Cart dashboard — set your colours and splash screen, build the tab bar and switch on a promo banner.",
    points: ["Colours", "Splash screen", "Tab bar", "Promo banner"],
  },
  {
    icon: "rocket",
    title: "Publish to Google Play & the App Store",
    description:
      "Store publishing support: we help you get your app live on Google Play and the App Store, under your own developer accounts.",
    points: ["Google Play", "App Store"],
  },
];

export const goCartFeatures: ProductFeature[] = [
  {
    icon: "tablet-smartphone",
    title: "Your whole store in the app",
    description:
      "The app loads your live Shopify store, so your theme and installed Shopify apps keep working — nothing to rebuild.",
  },
  {
    icon: "shopping-cart",
    title: "Native tab bar & live cart badge",
    description:
      "A native bottom tab bar for quick navigation, with a cart badge that updates as shoppers add items.",
  },
  {
    icon: "ticket-percent",
    title: "Promo banner with tap-to-copy coupons",
    description:
      "Put an offer in a banner and let shoppers copy the coupon code with a single tap.",
  },
  {
    icon: "palette",
    title: "Your colours & splash screen",
    description: "Brand the app with your own colours and a splash screen that greets every launch.",
  },
  {
    icon: "bell-ring",
    title: "Push notifications",
    description:
      "Rich pushes with images and deep links. Schedule them ahead and target audience segments (Pro).",
  },
  {
    icon: "zap",
    title: "Automations",
    description:
      "Welcome push, abandoned-cart reminders, order-shipped updates and back-in-stock alerts — the last three on Pro.",
  },
  {
    icon: "indian-rupee",
    title: "India-ready checkout",
    description:
      "UPI apps like GPay, PhonePe and Paytm, and Indian payment gateways, work right inside the app.",
  },
  {
    icon: "chart-column",
    title: "App analytics",
    description: "Track installs, app opens and push open rates for your app.",
  },
  {
    icon: "layout-dashboard",
    title: "Fits your theme, one switch at a time",
    description:
      "Switch the app's tab bar, your website's own bottom bar and the app's search bar on or off. Check my website finds what would show twice.",
  },
  {
    icon: "smartphone",
    title: "Preview before you publish",
    description:
      "Scan a QR code or type a short code in the Go Cart Preview app and see your app on a real phone before it goes to the stores.",
  },
  {
    icon: "refresh-cw",
    title: "Force-update & maintenance mode",
    description:
      "Require shoppers to update to the latest version, or put the app into maintenance mode when you need to.",
  },
];

/** "Why an app" — qualitative benefits only. */
export const goCartBenefits: ProductFeature[] = [
  {
    icon: "house-plus",
    title: "A spot on the home screen",
    description:
      "Your brand sits on your customers' phones, one tap away — no searching for your site or typing a URL.",
  },
  {
    icon: "send",
    title: "A channel you own",
    description:
      "Push notifications land on the lock screen of shoppers who opt in, so offers and updates reach them directly.",
  },
  {
    icon: "smartphone",
    title: "An app-like experience",
    description:
      "A native tab bar and live cart badge make it easy to browse, come back and get to checkout.",
  },
  {
    icon: "repeat",
    title: "Bring shoppers back automatically",
    description:
      "Automated pushes — a welcome on every plan; abandoned-cart, back-in-stock and order updates on Pro — keep working while you run the store.",
  },
];

/** Yearly billing charges this many months — i.e. 2 months free. */
export const YEARLY_MONTHS_CHARGED = 10;

/** Plans are billed through Shopify (Shopify App Pricing), in US dollars. */
export const GOCART_CURRENCY = "USD";

export type GoCartPlan = {
  id: "basic" | "pro";
  name: string;
  tagline: string;
  /** Monthly price in USD (whole dollars). Yearly = monthly × YEARLY_MONTHS_CHARGED. */
  monthly: number;
  /** Shown above the feature list, e.g. "Everything in Basic, plus:". */
  includes?: string;
  features: string[];
  featured?: boolean;
  /** Small factual label on the card. */
  badge?: string;
};

export const goCartPlans: GoCartPlan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Everything you need to launch your store's app.",
    monthly: 29,
    features: [
      "10,000 push notifications / month",
      "5,000 app users",
      "Products & customers",
      "Welcome automation",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For stores ready to automate and grow.",
    monthly: 49,
    includes: "Everything in Basic, plus:",
    features: [
      "50,000 push notifications / month",
      "25,000 app users",
      "Audience segments",
      "Abandoned-cart, order-update and back-in-stock automations",
      "Priority support",
    ],
    featured: true,
    badge: "All automations",
  },
];

export const yearlyPrice = (plan: GoCartPlan) => plan.monthly * YEARLY_MONTHS_CHARGED;

export const goCartFaqs: Faq[] = [
  {
    id: "theme-apps",
    question: "Will it work with my Shopify theme and apps?",
    answer:
      "Yes. Your Go Cart app loads your live Shopify store, so your theme, content and installed Shopify apps keep working in the app. Native extras — the tab bar, live cart badge and promo banner — are added on top.",
  },
  {
    id: "platforms",
    question: "Do I get both an Android and an iOS app?",
    answer:
      "Yes. Go Cart gives you a branded app for Android and for iOS, published to Google Play and the App Store.",
  },
  {
    id: "developer-accounts",
    question: "Do I need my own developer accounts?",
    answer:
      "Yes. Apple and Google require apps to be published from the merchant's own developer accounts — an Apple Developer Program membership and a Google Play Console account (their fees are paid directly to Apple and Google). We help you set them up, and our store publishing support takes you through the submission.",
  },
  {
    id: "push",
    question: "How do push notifications work?",
    answer:
      "Shoppers who install your app and allow notifications can receive your pushes. Write a message in your Go Cart dashboard, add an image and a deep link to the page it should open, then send it right away or schedule it. On Pro you can target audience segments. Automations send pushes for you: a welcome push on every plan, plus abandoned-cart, order-shipped and back-in-stock pushes on Pro. Each plan includes a monthly push allowance.",
  },
  {
    id: "upi",
    question: "Does UPI work inside the app?",
    answer:
      "Yes. Checkout is India-ready: UPI apps such as GPay, PhonePe and Paytm, and Indian payment gateways, work inside the app.",
  },
  {
    id: "billing",
    question: "How am I billed?",
    answer:
      "Through Shopify. Your Go Cart plan appears on your regular Shopify invoice, in US dollars, monthly or yearly. Pay yearly and you pay for 10 months instead of 12.",
  },
  {
    id: "trial",
    question: "Is there a free trial?",
    answer:
      "No. Instead, you can see your app on your own phone with the Go Cart Preview app before it is published to Google Play and the App Store.",
  },
  {
    id: "commission",
    question: "Do you take a commission on my sales?",
    answer:
      "No. You pay a flat monthly or yearly price. Go Cart takes no share of the orders placed in your app.",
  },
  {
    id: "cancel",
    question: "Can I cancel?",
    answer:
      "Yes. Change or cancel your plan from the Go Cart dashboard, or uninstall Go Cart from your Shopify admin. Because billing runs through Shopify, the charges stop with it.",
  },
];

/** "Why Go Cart" — how the usual routes to an app compare. Category-level and factual. */
export type GoCartComparisonRow = { label: string; custom: string; builders: string; goCart: string };

export const goCartComparison: GoCartComparisonRow[] = [
  {
    label: "What the app shows",
    custom: "A separate app your developers build and maintain",
    builders: "Screens you rebuild in the builder's editor",
    goCart: "Your live Shopify store, with native extras on top",
  },
  {
    label: "Your theme & Shopify apps",
    custom: "Rebuilt or reconnected one by one",
    builders: "Only what the builder supports",
    goCart: "Keep working, unchanged",
  },
  {
    label: "Keeping it up to date",
    custom: "A new app release for most changes",
    builders: "A second storefront to edit",
    goCart: "Change your website — the app shows it",
  },
  {
    // Public 2026 pricing of Shopify app builders: Shopney from $149, Vajro from $150,
    // Tapcart from $250 plus a fee on app sales, Appbrew from $499 (Shopify App Store / vendors).
    label: "Price",
    custom: "A large one-off build, then developer costs",
    builders: "Commonly $150–$500+ a month",
    goCart: "$29 or $49 a month",
  },
  {
    label: "Share of your sales",
    custom: "None",
    builders: "Some plans take a fee on app sales",
    goCart: "None",
  },
];

/** Services the app keeps working with — each one is supported in the app today. */
export const goCartIntegrations: { group: string; items: string[] }[] = [
  { group: "Your store", items: ["Your Shopify theme", "Installed Shopify apps", "Shopify checkout"] },
  {
    group: "Checkout & tracking",
    items: ["Shiprocket Checkout", "GoKwik", "Shopflo", "Razorpay", "Cashfree", "PayU", "CCAvenue", "Simpl", "Snapmint"],
  },
  { group: "UPI & wallets", items: ["Google Pay", "PhonePe", "Paytm", "BHIM", "CRED", "Amazon Pay", "MobiKwik"] },
  { group: "Reach", items: ["Push via Firebase", "WhatsApp, phone & email links", "Google Play", "App Store"] },
];

/**
 * Reviews from real Go Cart stores, with their permission — never invented. Until the first
 * ones arrive the section shows an "early stores" panel instead of empty or made-up cards.
 */
export type GoCartReview = {
  quote: string;
  name: string;
  role: string;
  store: string;
  /** 1–5, when the review came with a rating (e.g. from the Shopify App Store). */
  rating?: number;
  url?: string;
};

export const goCartReviews: GoCartReview[] = [];

/** Shopify App Store listing, once it is public — used for "Rate us" and review links. */
export const goCartAppStoreUrl: string | null = null;
