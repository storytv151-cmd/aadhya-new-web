/**
 * UI view models — the stable shapes the frontend renders.
 *
 * These deliberately do NOT mirror Payload's generated types 1:1. The website's
 * content layer maps raw CMS documents onto these view models (an anti-corruption
 * layer), so UI components depend on a stable contract rather than the CMS schema.
 */

export type ImageAsset = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Low-quality placeholder (base64) for blur-up. */
  blurDataURL?: string;
};

export type ProductStatus = "live" | "beta" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Emoji or icon key for lightweight rendering without an image request. */
  icon?: string;
  status: ProductStatus;
  href: string;
  features: string[];
  /** Flagship product gets visual priority across the site. */
  featured?: boolean;
  accent?: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
  href?: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: ImageAsset;
  technologies: string[];
  result?: string;
  href?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: ImageAsset;
  rating?: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type Stat = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places to show while counting. */
  decimals?: number;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon?: string;
};

export type TechCategory = "frontend" | "backend" | "mobile" | "cloud" | "database" | "tooling";

export type Technology = {
  name: string;
  icon?: string;
  category: TechCategory;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; avatar?: ImageAsset };
  publishedAt: string; // ISO date
  readingTimeMinutes: number;
  image?: ImageAsset;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Optional nested links for mega-menu / dropdown. */
  children?: NavLink[];
  badge?: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SocialLink = {
  platform: "twitter" | "linkedin" | "github" | "instagram" | "facebook" | "youtube" | "dribbble";
  href: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  social: SocialLink[];
};
