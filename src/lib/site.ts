/** Static site configuration used across metadata, SEO and structured data. */
export const siteConfig = {
  name: "Aadhya Infotech",
  shortName: "Aadhya",
  title: "Aadhya Infotech — We Craft Software Masterpieces",
  tagline: "We Craft Software Masterpieces.",
  description:
    "Aadhya Infotech is a software company delivering app, game and web development, UI/UX design, cloud, cyber security and digital marketing solutions for businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:17500",
  locale: "en_US",
  contact: {
    email: "aadhyainfotech02@gmail.com",
    phone: "+91 9104622842",
    phoneAlt: "+91 9099310347",
    address: "307, Dhara Trade Center, Near Lajamani Chowk, Surat, Gujarat",
    mapsUrl: "https://maps.app.goo.gl/UWbKiGwVHRa8Rdb57",
  },
  keywords: [
    "Aadhya Infotech",
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
