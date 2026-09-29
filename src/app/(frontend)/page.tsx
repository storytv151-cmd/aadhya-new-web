import type { Metadata } from "next";
import { BigCta } from "@/components/aurora/big-cta";
import { GoCartMorph } from "@/components/aurora/gocart-morph";
import { HeroWall } from "@/components/aurora/hero-wall";
import { MarqueeBand } from "@/components/aurora/marquee-band";
import { Preloader } from "@/components/aurora/preloader";
import { ProcessTimeline } from "@/components/aurora/process-timeline";
import { ServicesBento } from "@/components/aurora/services-bento";
import { StudioStatement, type Fact } from "@/components/aurora/studio-statement";
import { WorkShowcase } from "@/components/aurora/work-showcase";
import { Faqs } from "@/components/sections/faq";
import { OurProduct } from "@/components/sections/our-product";
import { portfolioProjects, services } from "@/content/site-content";
import { products } from "@/content/products";

// Title/description/Open Graph come from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Counted straight from the content, so they are always true.
const facts: Fact[] = [
  { value: services.length, label: "Services under one roof" },
  { value: portfolioProjects.length, label: "Projects in our portfolio" },
  { value: products.length, label: "Products we run ourselves" },
];

export default function Home() {
  return (
    <main>
      <Preloader />
      <HeroWall />
      <MarqueeBand />
      <StudioStatement facts={facts} />
      <GoCartMorph />
      <ServicesBento />
      <WorkShowcase />
      <ProcessTimeline />
      <OurProduct />
      <Faqs />
      <BigCta kicker="(06) Got an idea?" />
    </main>
  );
}
