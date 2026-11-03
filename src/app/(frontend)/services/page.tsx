import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/aurora/process-timeline";
import { ServicesBento } from "@/components/aurora/services-bento";
import { CTA } from "@/components/sections/cta";
import { Pricing } from "@/components/sections/pricing";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Software & Game Development Services in Surat",
  description:
    "Custom software, app, game and web development, UI/UX design, cloud and cyber security services from Aadhya Infotech in Surat, Gujarat.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our services"
        title="Services that move your business *forward*"
        description="One team for the full journey — from a first idea to a shipped product and the growth that follows."
      />
      <ServicesBento kicker="(01) What we do" detail />
      <ProcessTimeline kicker="(02) How we work" />
      <Pricing />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}
