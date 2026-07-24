import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aadhya Infotech is a software company delivering app, web and game development, design, cloud and security solutions for businesses.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="A software studio built on craft and trust"
        description="We design, build and distribute software products and services that solve real problems and drive growth."
      />
      <About />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}
