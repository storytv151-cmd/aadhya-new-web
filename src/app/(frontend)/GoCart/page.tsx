import type { Metadata } from "next";
import { GoCartMorph } from "@/components/aurora/gocart-morph";
import { GoCartBenefits } from "@/components/gocart/benefits";
import { GoCartComparison } from "@/components/gocart/comparison";
import { GoCartCta } from "@/components/gocart/cta";
import { GoCartDemo } from "@/components/gocart/demo-video";
import { GoCartFaq } from "@/components/gocart/faq";
import { GoCartFeatures } from "@/components/gocart/features";
import { GoCartHero } from "@/components/gocart/hero";
import { GoCartHowItWorks } from "@/components/gocart/how-it-works";
import { GoCartIntegrations } from "@/components/gocart/integrations";
import { GoCartPricing } from "@/components/gocart/pricing";
import { GoCartReviews } from "@/components/gocart/reviews";
import { JsonLd } from "@/components/seo/json-ld";
import { goCartDemoVideo, goCartFromPrice, goCartLinks } from "@/content/gocart";
import { goCartFaqJsonLd, goCartJsonLd, goCartVideoJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

// Served at /GoCart (App Router paths are case-sensitive — the folder name is the URL).
// The Go Cart dashboard (/GoCart/app) and API (/GoCart/api) are separate apps behind
// nginx; this site must not define routes under them.

// Kept under ~160 characters so search results show it whole.
const description =
  `Go Cart turns your Shopify store into a branded Android and iOS app with push notifications, automations and UPI checkout. From $${goCartFromPrice}/month, no commission.`;

export const metadata: Metadata = pageMetadata({
  title: "Go Cart: Shopify Mobile App Builder",
  description,
  path: "/GoCart",
  // The demo video's poster frame (1600×900) doubles as the share image.
  image: {
    url: goCartDemoVideo.poster,
    width: 1600,
    height: 900,
    alt: "Go Cart — a Shopify store running as a branded Android and iOS app",
  },
});

export default function GoCartPage() {
  return (
    <main>
      <JsonLd data={goCartJsonLd({ description })} />
      <JsonLd data={goCartFaqJsonLd()} />
      <JsonLd data={goCartVideoJsonLd()} />
      <GoCartHero />
      <GoCartMorph kicker="Go Cart · see it in motion" cta={{ href: goCartLinks.register, label: "Get started", external: true }} />
      <GoCartComparison />
      <GoCartHowItWorks />
      <GoCartDemo />
      <GoCartFeatures />
      <GoCartBenefits />
      <GoCartIntegrations />
      <GoCartPricing />
      <GoCartReviews />
      <GoCartFaq />
      <GoCartCta />
    </main>
  );
}
