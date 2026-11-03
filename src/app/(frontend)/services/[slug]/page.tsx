import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ProcessTimeline } from "@/components/aurora/process-timeline";
import { CTA } from "@/components/sections/cta";
import { Faqs } from "@/components/sections/faq";
import { getIcon } from "@/components/sections/icon-map";
import { ProjectTile } from "@/components/sections/portfolio";
import { PageHeader } from "@/components/layout/page-header";
import { SiteLink } from "@/components/layout/site-link";
import { JsonLd } from "@/components/seo/json-ld";
import { products } from "@/content/products";
import { servicePageBySlug, servicePages } from "@/content/service-pages";
import { portfolioProjects, services } from "@/content/site-content";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button, Container, Eyebrow, Glass, GradientText, Reveal, Section } from "@/ui";

type Params = { params: Promise<{ slug: string }> };

// Only the six services exist; any other /services/<x> is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = servicePageBySlug((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const page = servicePageBySlug(slug);
  const service = services.find((s) => s.slug === slug);
  if (!page || !service) notFound();

  const path = `/services/${page.slug}`;
  const work = page.work.flatMap((s) => portfolioProjects.filter((p) => p.slug === s));
  const ownProducts = page.products.flatMap((s) => products.filter((p) => p.slug === s));
  const others = services.filter((s) => s.slug !== page.slug);

  return (
    <main>
      <JsonLd data={serviceJsonLd(page, service.title)} />
      <JsonLd
        data={breadcrumbJsonLd([
          ["Home", "/"],
          ["Services", "/services"],
          [service.title, path],
        ])}
      />
      <JsonLd data={faqPageJsonLd(path, page.faqs)} />

      <PageHeader eyebrow={`Services / ${service.title}`} title={page.headline} description={page.intro} />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Breadcrumb" className="text-muted-foreground mb-6 text-sm">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href="/services" className="hover:text-foreground transition-colors">
                Services
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-foreground" aria-current="page">
                {service.title}
              </span>
            </nav>
            <Reveal direction="none">
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
                {service.title} <GradientText>in Surat</GradientText>
              </h2>
            </Reveal>
            {page.overview.map((paragraph, i) => (
              <Reveal key={i} delay={0.1}>
                <p className="text-muted-foreground mt-5 text-pretty">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.15}>
              <Button asChild className="mt-8">
                <Link href="/contact">
                  Start a project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {page.offerings.map((offering, index) => (
              <Reveal key={offering.title} delay={(index % 2) * 0.06}>
                <Glass specular interactive className="flex h-full gap-4 rounded-[1.75rem] p-6">
                  <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset">
                    <Check className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{offering.title}</h3>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{offering.description}</p>
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <Reveal direction="none">
            <Eyebrow>Tools we use</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {page.stack.map((tool) => (
                <li key={tool} className="aur-chip">
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>

          {work.length > 0 && (
            <>
              <Reveal direction="none">
                <Eyebrow className="mt-16">Our work</Eyebrow>
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {work.map((project, index) => (
                  <Reveal key={project.slug} delay={0.05 + index * 0.06}>
                    <ProjectTile project={project} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          {ownProducts.length > 0 && (
            <>
              <Reveal direction="none">
                <Eyebrow className="mt-16">Built and run by us</Eyebrow>
              </Reveal>
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {ownProducts.map((product, index) => (
                  <Reveal key={product.slug} delay={0.05 + index * 0.06}>
                    <SiteLink href={product.href} external={product.external} className="group block h-full">
                      <Glass specular interactive className="flex h-full flex-col rounded-[2rem] p-7">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                          <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{product.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.stack.map((tech) => (
                            <span
                              key={tech}
                              className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-3 py-1 text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </Glass>
                    </SiteLink>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>

      <ProcessTimeline kicker="How we work" />
      <Faqs items={page.faqs} />

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <Reveal direction="none">
            <Eyebrow>More services</Eyebrow>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((other) => {
              const Icon = getIcon(other.icon);
              return (
                <Link key={other.slug} href={`/services/${other.slug}`} className="group block h-full">
                  <Glass specular interactive className="flex h-full items-center gap-3 rounded-[1.5rem] p-5">
                    <span className="bg-primary/12 text-primary ring-primary/15 flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </span>
                    <span className="font-semibold tracking-tight">{other.title}</span>
                  </Glass>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTA />
    </main>
  );
}
