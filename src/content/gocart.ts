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
    title: "Connect your website or Shopify store",
    description:
      "Sign up with your website address, or connect your Shopify store through Shopify's secure OAuth. Your app runs on the site you already have, so there's nothing to migrate.",
    points: ["Website or Shopify", "Nothing to migrate"],
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
      "We publish your app on Google Play and the App Store under Go Cart's developer account, included in every plan. You can move it to your own account at any time, free.",
    points: ["Google Play", "App Store"],
  },
];

export const goCartFeatures: ProductFeature[] = [
  {
    icon: "tablet-smartphone",
    title: "Your whole store in the app",
    description:
      "The app loads your live website or Shopify store, so your theme, plugins and Shopify apps keep working — nothing to rebuild.",
  },
  {
    icon: "shopping-cart",
    title: "Native tab bar & live cart badge",
    description:
      "A native bottom tab bar for quick navigation and, with a Shopify store, a cart badge that updates as shoppers add items.",
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
      "Rich pushes with images and deep links, unlimited on every plan. Schedule them ahead and send to all app users or one device — with a Shopify store, target customers and Shopify segments too.",
  },
  {
    icon: "zap",
    title: "Automations",
    description:
      "Welcome and win-back pushes on every plan. With a Shopify store, also abandoned-cart reminders, order-shipped updates and back-in-stock alerts.",
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
      "A native tab bar (plus a live cart badge on Shopify stores) makes it easy to browse, come back and get to checkout.",
  },
  {
    icon: "repeat",
    title: "Bring shoppers back automatically",
    description:
      "Automated pushes — a welcome and win-back on every plan, plus abandoned-cart reminders, back-in-stock alerts and order updates with a Shopify store — keep working while you run the store.",
  },
];

/** Yearly billing charges this many months — i.e. 2 months free. */
export const YEARLY_MONTHS_CHARGED = 10;

/** Plans are billed through Shopify (Shopify App Pricing), in US dollars — one price worldwide. */
export const GOCART_CURRENCY = "USD";

export type GoCartPlan = {
  /** Shopify plan handle (Shopify App Pricing). */
  id: "webview" | "native" | "brand";
  name: string;
  tagline: string;
  /** Monthly price in USD (whole dollars). Yearly = monthly × YEARLY_MONTHS_CHARGED. */
  monthly: number;
  /** Shown above the feature list, e.g. "Everything in WebView, plus:". */
  includes?: string;
  features: string[];
  featured?: boolean;
  /** Small factual label on the card. */
  badge?: string;
};

/**
 * Three plans, each with everything in the one before (owner, 2026-09-27: GO_CART_NEXT_FEATURES.md
 * section P0). Push notifications and app users are unlimited on every plan.
 */
export const goCartPlans: GoCartPlan[] = [
  {
    id: "webview",
    name: "WebView",
    tagline: "Your website as an app, with the tools to grow.",
    monthly: 59,
    features: [
      "Your whole website in the app — your theme, plugins and Shopify apps keep working",
      "Android and iOS apps, published for you to Google Play and the App Store",
      "Your colours, splash screen, onboarding slides and popup",
      "Native tab bar, promo banner and search bar (plus a cart badge on Shopify stores)",
      "Unlimited push notifications — images, links, scheduled or instant",
      "Unlimited app users",
      "Automations: welcome and win-back — plus abandoned cart, back in stock, order updates and more with a Shopify store",
      "Push to all app users or one device — or, with a Shopify store, to specific customers and Shopify segments",
      "App-only discount (with a Shopify store)",
      "Full analytics, and a monthly report of what your app sold (with a Shopify store)",
      "Ads tracking (Meta, Google, TikTok), and Klaviyo with a Shopify store",
      "UPI and Indian checkouts (Shiprocket, GoKwik…) inside the app",
      "Email support",
    ],
  },
  {
    id: "native",
    name: "Native",
    tagline: "A fully native app, designed by you. Needs a Shopify store.",
    monthly: 199,
    includes: "Everything in WebView, plus:",
    features: [
      "Home, collection, product and cart screens built natively in code",
      "Ready-made themes and a studio to design every page",
      "Native cart, search, filters and Shopify checkout",
      "App-only drops with early access, and scheduled home blocks",
      "Email support",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    id: "brand",
    name: "Brand",
    tagline: "For bigger brands that want it done for them. Needs a Shopify store.",
    monthly: 449,
    includes: "Everything in Native, plus:",
    features: [
      "A/B tests of your home screen",
      "Done-for-you design every quarter",
      "A named success manager",
      "Same-day support and WhatsApp",
    ],
  },
];

export const yearlyPrice = (plan: GoCartPlan) => plan.monthly * YEARLY_MONTHS_CHARGED;

/** The lowest monthly price, for "Plans from $…" lines. */
export const goCartFromPrice = Math.min(...goCartPlans.map((plan) => plan.monthly));

/** A /GoCart FAQ. When `link` is set, its `text` appears in `answer` and is shown as a link. */
export type GoCartFaqItem = Faq & { link?: { text: string; href: string } };

export const goCartFaqs: GoCartFaqItem[] = [
  {
    id: "theme-apps",
    question: "Will it work with my Shopify theme and apps?",
    answer:
      "Yes. Your Go Cart app loads your live Shopify store, so your theme, content and installed Shopify apps keep working in the app. Native extras — the tab bar, live cart badge and promo banner — are added on top.",
  },
  {
    id: "webview",
    question: "What does \"WebView app\" mean?",
    answer:
      "Your Go Cart app shows your live website or Shopify store inside a real Android and iOS app, with native extras on top: the tab bar, promo banner, search bar and push notifications (plus a cart badge on Shopify stores). Anything you change on your website shows up in the app straight away. Want screens built natively in code instead? That's the Native plan, for Shopify stores.",
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
      "No. Publishing under Go Cart's developer account is included in every plan, and we can move the app to your own account later, free. If you prefer your own Apple Developer Program and Google Play Console accounts from the start (their fees are paid to Apple and Google directly), connect them in the dashboard and we publish there.",
  },
  {
    id: "push",
    question: "How do push notifications work?",
    answer:
      "Shoppers who install your app and allow notifications can receive your pushes. Write a message in your Go Cart dashboard, add an image and a deep link to the page it should open, then send it right away or schedule it. On every plan you can send to all app users or a single device; with a Shopify store you can also target one customer or a Shopify segment. Automations send pushes for you: welcome and win-back pushes on every plan, plus abandoned-cart, order-shipped and back-in-stock pushes with a Shopify store. Push notifications and app users are unlimited on every plan; to keep your app from feeling like spam, up to 30 notifications to your shoppers go out in any 24 hours (automations and test sends don't count).",
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
      "Through Shopify. Your Go Cart plan appears on your regular Shopify invoice, in US dollars, monthly or yearly — the same price in every country. If you sign up on our website instead, you pay the same amount in US dollars through Razorpay. Pay yearly and you pay for 10 months instead of 12.",
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
      "Yes, at any time. If you pay through Razorpay, cancel from Plan & billing in the Go Cart dashboard. If Shopify bills you, uninstall Go Cart from your Shopify admin or cancel from Plan & billing. Either way, your app and dashboard keep working until the end of the period you have already paid for, and no further charge is made. The details are in our Subscription, Cancellation & Refund Policy.",
    link: { text: "Subscription, Cancellation & Refund Policy", href: "/refund-policy" },
  },
];

/** "Why Go Cart" — how the usual routes to an app compare. Category-level and factual. */
export type GoCartComparisonRow = { label: string; custom: string; builders: string; goCart: string };

export const goCartComparison: GoCartComparisonRow[] = [
  {
    label: "What the app shows",
    custom: "A separate app your developers build and maintain",
    builders: "Screens you rebuild in the builder's editor",
    goCart: "Your live website or Shopify store with native extras on top — or, for Shopify stores, a fully native app on the Native plan",
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
    goCart: `From $${goCartFromPrice} a month, with unlimited push`,
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

/** The walkthrough video (also the Shopify App Store screencast): setup, phone preview, a push, plans. */
export const goCartDemoVideo = {
  // ?v= changes with each new cut so browsers fetch it again (the file path stays the same:
  // the Shopify listing links the bare /videos/go-cart-demo.mp4 as its screencast).
  src: "/videos/go-cart-demo.mp4?v=20261001",
  poster: "/videos/go-cart-demo.jpg?v=20261001b",
} as const;
