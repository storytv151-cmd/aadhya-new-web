/**
 * Photography for the Aurora design. Stock photos come from Shopify's Burst library
 * (free for commercial use, no attribution needed); a 1200px copy of each lives in
 * /public/stock so next/image can serve it from this site as AVIF/WebP at the size each
 * slot needs. Our own work lives in /public/portfolio.
 */

export const stock = (slug: string) => `/stock/${slug}.jpg`;

export type Visual = { src: string; alt: string };

/** Hero wall — our work mixed with studio and product photography. Decorative. */
export const heroWall: Visual[] = [
  { src: "/portfolio/asal-masala.jpg", alt: "" },
  { src: stock("tracking-sale-on-mobile"), alt: "" },
  { src: stock("woman-models-against-blue-sky"), alt: "" },
  { src: "/portfolio/highway-traffic-rider.webp", alt: "" },
  { src: stock("team-working-together-with-laptops"), alt: "" },
  { src: "/portfolio/vedarch.jpg", alt: "" },
  { src: stock("fashionable-black-and-white-sneakers"), alt: "" },
  { src: stock("person-using-pencil-to-design-on-tablet"), alt: "" },
  { src: "/portfolio/zombie-shooter.webp", alt: "" },
  { src: stock("hands-hold-wireless-headphones-in-a-case"), alt: "" },
  { src: stock("freelance-designer-working-on-laptop"), alt: "" },
  { src: "/portfolio/accubow.webp", alt: "" },
  { src: stock("model-with-leather-jacket-over-shoulders"), alt: "" },
  { src: stock("a-minimal-yet-cosy-workspace"), alt: "" },
  { src: "/portfolio/gift-shop.jpg", alt: "" },
  { src: stock("teen-texting-on-smartphone"), alt: "" },
  { src: stock("laptop-from-side"), alt: "" },
  { src: stock("red-handbag-with-gold-detail"), alt: "" },
  { src: stock("designer-at-work"), alt: "" },
  { src: stock("hand-holds-out-phone-against-black-background"), alt: "" },
];

/** Service cards that carry a photo (keyed by service slug). */
export const serviceVisuals: Record<string, Visual> = {
  "app-development": { src: stock("tracking-sale-on-mobile"), alt: "A hand holding a phone showing a sales chart" },
  "ui-ux-design": { src: stock("person-using-pencil-to-design-on-tablet"), alt: "A designer sketching on a tablet" },
  "cloud-services": { src: stock("a-minimal-yet-cosy-workspace"), alt: "A tidy desk with a desktop computer" },
};

/** The sample Shopify store shown in the Go Cart desktop → app morph. */
export const storeMock = {
  name: "MAISON NORD",
  domain: "maisonnord.com",
  edit: "Night Edit",
  hero: stock("model-with-leather-jacket-over-shoulders"),
  promo: stock("clothing-on-retail-rack"),
  push: "Night Edit just dropped — 20% off today only.",
  products: [
    { name: "Court sneaker", price: "$120", src: stock("fashionable-black-and-white-sneakers") },
    { name: "Oak watch", price: "$180", src: stock("watch-with-leather-strap-near-leaves") },
    { name: "Mini bag", price: "$95", src: stock("red-handbag-with-gold-detail") },
    { name: "Rose shades", price: "$60", src: stock("pink-sunglasses-on-white") },
  ],
};

export const marqueeRows: string[][] = [
  ["Apps", "Games", "Websites", "Cloud"],
  ["UI/UX", "Security", "Shopify apps", "SaaS"],
];
