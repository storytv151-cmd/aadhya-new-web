import { GOCART_CURRENCY, goCartPlans } from "@/content/gocart";
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

/** Go Cart (/GoCart) as a SoftwareApplication with its monthly INR plans as offers. */
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
