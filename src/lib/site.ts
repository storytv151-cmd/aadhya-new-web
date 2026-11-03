/** Static site configuration used across metadata, SEO and structured data. */
export const siteConfig = {
  name: "Aadhya Infotech",
  shortName: "Aadhya",
  // Says what we do and where, for search results; the tagline stays the brand line.
  title: "Aadhya Infotech: Software, App & Game Development in Surat",
  tagline: "We Craft Software Masterpieces.",
  description:
    "Software company in Surat, Gujarat: custom software, app and game development, websites, UI/UX, cloud and security, plus our own products Go Cart and DevStore.",
  // Canonical origin for metadata, sitemap, robots and JSON-LD. Defaults to production so
  // a server without NEXT_PUBLIC_SITE_URL never publishes localhost canonical URLs.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aadhya-infotech.com").replace(/\/+$/, ""),
  locale: "en_US",
  contact: {
    email: "aadhyainfotech02@gmail.com",
    phone: "+91 9104622842",
    phoneAlt: "+91 9099310347",
    address: "307, Dhara Trade Center, Near Lajamani Chowk, Surat, Gujarat",
    // The same address split for structured data.
    street: "307, Dhara Trade Center, Near Lajamani Chowk",
    city: "Surat",
    region: "Gujarat",
    mapsUrl: "https://maps.app.goo.gl/UWbKiGwVHRa8Rdb57",
  },
  keywords: [
    "Aadhya Infotech",
    "software company in Surat",
    "app development company in Surat",
    "game development company in Surat",
    "Go Cart",
    "DevStore",
    "software company",
    "mobile app development",
    "game development",
    "web development",
    "UI/UX design",
    "cyber security",
    "cloud services",
    "digital marketing",
    "Surat",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
