import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button, Container, Glass, Reveal, Section } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { SiteLink } from "@/components/layout/site-link";
import { CTA } from "@/components/sections/cta";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: "Software products designed, built and maintained end-to-end by Aadhya Infotech.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our products"
        title="Products we build and run"
        description="Our own software products — designed, built and maintained end-to-end by Aadhya Infotech."
      />

      <Section>
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.06}>
                <Glass specular interactive className="rounded-[2rem] p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-primary/12 text-primary rounded-full px-3 py-1 text-xs font-medium">
                      {product.category}
                    </span>
                    <span className="bg-foreground/[0.06] text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
                      {product.status}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-xl">
                      <h2 className="text-2xl font-semibold tracking-tight">{product.name}</h2>
                      <p className="text-muted-foreground mt-2 text-pretty leading-relaxed">
                        {product.summary}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {product.stack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-2.5 py-1 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Button asChild>
                        <SiteLink href={product.href} external={product.external}>
                          {product.cta}
                          <ArrowRight className="size-4" />
                        </SiteLink>
                      </Button>
                    </div>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </main>
  );
}
