import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { CTA } from "@/components/sections/cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Software Company in Surat",
  description:
    "Aadhya Infotech is a software company in Surat, Gujarat that builds apps, games and websites for clients and runs its own products, Go Cart and DevStore.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title="A software studio built on *craft* and trust"
        description="We design, build and distribute software products and services that solve real problems and drive growth."
      />
      <About showMoreLink={false} />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}
