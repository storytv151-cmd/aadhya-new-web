import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { Portfolio } from "@/components/sections/portfolio";
import { Technologies } from "@/components/sections/technologies";
import { PageHeader } from "@/components/layout/page-header";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "A selection of apps, games and products Aadhya Infotech has designed, built and shipped.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Project showcase"
        title="Work we're proud of"
        description="A selection of the products we've designed, built and shipped for our clients."
      />
      <Portfolio />
      <Technologies />
      <CTA />
    </main>
  );
}
