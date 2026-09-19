import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Aadhya Infotech is a software company delivering app, web and game development, design, cloud and security solutions for businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="A software studio built on craft and trust"
        description="We design, build and distribute software products and services that solve real problems and drive growth."
      />
      <About />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}
