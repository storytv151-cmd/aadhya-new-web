import { GOCART_CURRENCY, goCartDemoVideo, goCartFaqs, goCartPlans } from "@/content/gocart";
import type { ServicePage } from "@/content/service-pages";
import { siteConfig } from "@/lib/site";
import type { Faq } from "@/types";

const areaServed = [
  { "@type": "City", name: siteConfig.contact.city },
  { "@type": "Country", name: "India" },
];

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
      streetAddress: siteConfig.contact.street,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region,
      addressCountry: "IN",
    },
    areaServed,
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


/** A page's FAQ section as FAQPage, so search engines can read the questions and answers. */
export function faqPageJsonLd(path: string, faqs: Pick<Faq, "question" | "answer">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function goCartFaqJsonLd() {
  return faqPageJsonLd("/GoCart", goCartFaqs);
}

/** A /services/<slug> page: the service we offer, provided by the organization. */
export function serviceJsonLd(page: ServicePage, name: string) {
  const url = `${siteConfig.url}/services/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: name,
    url,
    description: page.metaDescription,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed,
  };
}

/** Breadcrumb trail; `items` are [name, site-relative path] from the home page down. */
export function breadcrumbJsonLd(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${siteConfig.url}${path}`,
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
