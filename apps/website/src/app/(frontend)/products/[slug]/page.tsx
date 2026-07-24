import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, Container, Eyebrow, Glass, Magnetic, Reveal, Section } from "@aadhya/ui";
import { CTA } from "@/components/sections/cta";
import { getIcon } from "@/components/sections/icon-map";
import { getProduct, products } from "@/content/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <Container>
          <Reveal direction="none">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              <ArrowRight className="size-4 rotate-180" />
              All products
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/12 text-primary rounded-full px-3 py-1 text-xs font-medium">
                    {product.category}
                  </span>
                  <span className="bg-foreground/[0.06] text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
                    {product.status}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-muted-foreground mt-5 max-w-xl text-pretty text-lg leading-relaxed">
                  {product.summary}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic strength={0.3}>
                  <Button asChild size="lg">
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      Visit {product.name}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </Magnetic>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary group inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                  Talk to us
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Overview + highlights */}
      <Section>
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal direction="none">
              <Eyebrow>Overview</Eyebrow>
            </Reveal>
            {product.overview.map((paragraph, index) => (
              <Reveal key={index} delay={0.05 + index * 0.05}>
                <p className="text-muted-foreground mt-5 text-pretty leading-relaxed">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal direction="none">
              <Eyebrow>Highlights</Eyebrow>
            </Reveal>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {product.features.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <Reveal key={feature.title} delay={(index % 2) * 0.06}>
                    <Glass
                      specular
                      interactive
                      className="flex h-full flex-col gap-3 rounded-[1.5rem] p-6"
                    >
                      <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 items-center justify-center rounded-2xl ring-1 ring-inset">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </Glass>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </main>
  );
}
