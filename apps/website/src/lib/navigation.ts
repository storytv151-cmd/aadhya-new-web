import type { FooterColumn, NavLink, SocialLink } from "@aadhya/types";

/**
 * Navigation for Aadhya Infotech (a software & digital-services company).
 * Content mirrors the live site. In W5 the Payload `Navigation` / `Footer` globals
 * can override these; the shapes match, so it is a drop-in swap.
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
