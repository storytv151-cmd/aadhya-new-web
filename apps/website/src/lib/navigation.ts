import type { FooterColumn, NavLink, SocialLink } from "@aadhya/types";
import { products } from "@/content/products";

/**
 * Navigation for Aadhya Infotech (a software & digital-services company).
 * Content mirrors the live site.
 */

export const mainNav: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "App Development", href: "/services#app-development" },
      { label: "Game Development", href: "/services#game-development" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "UI/UX Design", href: "/services#ui-ux-design" },
      { label: "Cyber Security", href: "/services#cyber-security" },
      { label: "Cloud Services", href: "/services#cloud-services" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    // Dropdown lists our own products; each item opens its detail page.
    children: products.map((product) => ({
      label: product.name,
      href: `/products/${product.slug}`,
      description: product.tagline,
    })),
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "App Development", href: "/services#app-development" },
      { label: "Game Development", href: "/services#game-development" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "UI/UX Design", href: "/services#ui-ux-design" },
      { label: "Cyber Security", href: "/services#cyber-security" },
      { label: "Cloud Services", href: "/services#cloud-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/** No public social profiles confirmed on the live site yet — populate when available. */
export const socialLinks: SocialLink[] = [];
