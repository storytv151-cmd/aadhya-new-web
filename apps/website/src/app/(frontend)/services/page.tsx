import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Services",
  description:
    "App, game and web development, UI/UX design, cyber security and cloud services — everything you need to design, build and scale software.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our services"
        title="Services that move your business forward"
        description="One team for the full journey — from a first idea to a shipped product and the growth that follows."
      />
      <Services />
      <Process />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}
