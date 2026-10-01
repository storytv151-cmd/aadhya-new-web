import { GOCART_CURRENCY, goCartDemoVideo, goCartFaqs, goCartPlans } from "@/content/gocart";
import { siteConfig } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "IN",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Go Cart (/GoCart) as a SoftwareApplication with its monthly USD plans as offers. */
export function goCartJsonLd({ description }: { description: string }) {
  const url = `${siteConfig.url}/GoCart`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: "Go Cart",
    url,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: goCartPlans.map((plan) => ({
      "@type": "Offer",
      name: `Go Cart ${plan.name}`,
      url: `${url}#pricing`,
      price: plan.monthly.toFixed(2),
      priceCurrency: GOCART_CURRENCY,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.monthly.toFixed(2),
        priceCurrency: GOCART_CURRENCY,
        billingDuration: "P1M",
        unitText: "MONTH",
      },
    })),
  };
}


/** The /GoCart FAQ section as FAQPage, so search engines can read the questions and answers. */
export function goCartFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/GoCart#faq`,
    mainEntity: goCartFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** The /GoCart walkthrough video (the same file is the Shopify App Store screencast). */
export function goCartVideoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${siteConfig.url}/GoCart#demo`,
    name: "Go Cart walkthrough: Shopify store to Android and iOS app",
    description:
      "Set up Go Cart inside the Shopify admin, preview the app on a phone, send a push notification and choose a plan (WebView, Native or Brand).",
    thumbnailUrl: `${siteConfig.url}${goCartDemoVideo.poster}`,
    contentUrl: `${siteConfig.url}${goCartDemoVideo.src}`,
    uploadDate: "2026-10-01",
    duration: "PT2M46S",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}
