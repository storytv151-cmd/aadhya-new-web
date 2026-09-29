/**
 * Photography for the Aurora design. Stock photos come from Shopify's Burst library
 * (free for commercial use, no attribution needed) and are served from its CDN at the
 * size each slot needs; our own work lives in /public/portfolio.
 */

export const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg`;

export type Visual = { src: string; alt: string };

/** Hero wall — our work mixed with studio and product photography. Decorative. */
export const heroWall: Visual[] = [
  { src: "/portfolio/asal-masala.jpg", alt: "" },
  { src: burst("tracking-sale-on-mobile"), alt: "" },
  { src: burst("woman-models-against-blue-sky"), alt: "" },
  { src: "/portfolio/highway-traffic-rider.webp", alt: "" },
  { src: burst("team-working-together-with-laptops"), alt: "" },
  { src: "/portfolio/vedarch.jpg", alt: "" },
  { src: burst("fashionable-black-and-white-sneakers"), alt: "" },
  { src: burst("person-using-pencil-to-design-on-tablet"), alt: "" },
  { src: "/portfolio/zombie-shooter.webp", alt: "" },
  { src: burst("hands-hold-wireless-headphones-in-a-case"), alt: "" },
  { src: burst("freelance-designer-working-on-laptop"), alt: "" },
  { src: "/portfolio/accubow.webp", alt: "" },
  { src: burst("model-with-leather-jacket-over-shoulders"), alt: "" },
  { src: burst("a-minimal-yet-cosy-workspace"), alt: "" },
  { src: "/portfolio/gift-shop.jpg", alt: "" },
  { src: burst("teen-texting-on-smartphone"), alt: "" },
  { src: burst("laptop-from-side"), alt: "" },
  { src: burst("red-handbag-with-gold-detail"), alt: "" },
  { src: burst("designer-at-work"), alt: "" },
  { src: burst("hand-holds-out-phone-against-black-background"), alt: "" },
];

/** Service cards that carry a photo (keyed by service slug). */
export const serviceVisuals: Record<string, Visual> = {
  "app-development": { src: burst("tracking-sale-on-mobile"), alt: "A hand holding a phone showing a sales chart" },
  "ui-ux-design": { src: burst("person-using-pencil-to-design-on-tablet"), alt: "A designer sketching on a tablet" },
  "cloud-services": { src: burst("a-minimal-yet-cosy-workspace"), alt: "A tidy desk with a desktop computer" },
};

/** The sample Shopify store shown in the Go Cart desktop → app morph. */
export const storeMock = {
  name: "MAISON NORD",
  domain: "maisonnord.com",
  edit: "Night Edit",
  hero: burst("model-with-leather-jacket-over-shoulders"),
  promo: burst("clothing-on-retail-rack"),
  push: "Night Edit just dropped — 20% off today only.",
  products: [
    { name: "Court sneaker", price: "$120", src: burst("fashionable-black-and-white-sneakers") },
    { name: "Oak watch", price: "$180", src: burst("watch-with-leather-strap-near-leaves") },
    { name: "Mini bag", price: "$95", src: burst("red-handbag-with-gold-detail") },
    { name: "Rose shades", price: "$60", src: burst("pink-sunglasses-on-white") },
  ],
};

export const marqueeRows: string[][] = [
  ["Apps", "Games", "Websites", "Cloud"],
  ["UI/UX", "Security", "Shopify apps", "SaaS"],
];
