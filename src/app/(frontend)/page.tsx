import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";
import { Faqs } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { LatestBlog } from "@/components/sections/latest-blog";
import { OurProduct } from "@/components/sections/our-product";
import { Portfolio } from "@/components/sections/portfolio";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Technologies } from "@/components/sections/technologies";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

// Title/description/Open Graph come from the root layout; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <OurProduct />
      <Services />
      <Process />
      <Portfolio />
      <WhyChooseUs />
      <Technologies />
      <Pricing />
      <LatestBlog />
      <Faqs />
      <CTA />
    </main>
  );
}
