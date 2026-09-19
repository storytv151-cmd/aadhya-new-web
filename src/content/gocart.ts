import type { Faq } from "@/types";
import type { ProductFeature } from "./products";

/**
 * Copy for the Go Cart landing page (/GoCart). Every claim here must be provable from
 * the product itself: no usage numbers, percentages, customer logos or testimonials.
 * `icon` values are lucide icon names resolved via components/sections/icon-map.
 */

/** The Go Cart dashboard is a separate app on this domain — link with a plain <a>. */
export const goCartLinks = {
  register: "/GoCart/app/register",
  login: "/GoCart/app/login",
} as const;

export const goCartTrust = ["14-day free trial", "Android & iOS", "Secure Shopify OAuth"];

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

export type GoCartPlan = {
  id: "basic" | "pro";
  name: string;
  tagline: string;
  /** Monthly price in INR (whole rupees). Yearly = monthly × YEARLY_MONTHS_CHARGED. */
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
    monthly: 1499,
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
    monthly: 3999,
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
    id: "cancel",
    question: "Can I cancel?",
    answer:
      "Yes. You can cancel your subscription from your Go Cart dashboard. Your plan stays active until the end of the billing period you've paid for.",
  },
];
