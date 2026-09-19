import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Container, Glass, GradientText, Magnetic, Reveal, Section } from "@/ui";
import { cn } from "@/utils";
import { products, type Product } from "@/content/products";
import { SiteLink } from "@/components/layout/site-link";
import { GoCartMockup } from "@/components/gocart/phone-mockup";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";

// Full class strings so Tailwind picks up each gradient (no dynamic concatenation).
// All on the blue/indigo/cyan brand ramp — no off-system palette colours.
const productTiles: { grad: string; price: string }[] = [
  { grad: "from-brand-from/25 to-brand-to/20", price: "$49" },
  { grad: "from-accent-indigo/25 to-accent-cyan/15", price: "$39" },
  { grad: "from-primary/25 to-brand-to/15", price: "$59" },
  { grad: "from-brand-via/25 to-accent-cyan/15", price: "$29" },
];

function DevStoreMockup() {
  return (
    // Purely decorative illustration — hide its placeholder text/prices from AT.
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_66%)] opacity-[0.1] blur-3xl"
      />
      <Glass
        strength="showcase"
        specular
        refract
        interactive={false}
        className="overflow-hidden rounded-[1.5rem]"
      >
        {/* browser bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="flex gap-1.5">
            <span className="bg-foreground/15 size-2.5 rounded-full" />
            <span className="bg-foreground/15 size-2.5 rounded-full" />
            <span className="bg-foreground/15 size-2.5 rounded-full" />
          </span>
          <span className="glass-surface text-muted-foreground mx-auto min-w-0 max-w-full truncate rounded-full px-4 py-1 text-xs">
            aadhya-infotech.com/DevStore
          </span>
        </div>

        {/* store header */}
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          <div className="flex items-center gap-2">
            <span className="from-brand-from to-brand-to flex size-7 items-center justify-center rounded-lg bg-gradient-to-br text-[11px] font-bold text-white">
              D
            </span>
            <span className="text-sm font-semibold tracking-tight">DevStore</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-foreground/[0.05] h-6 w-24 rounded-full" />
            <span className="bg-primary/80 size-6 rounded-full" />
          </div>
        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 gap-3 p-5">
          {productTiles.map((tile, i) => (
            <div key={i} className="glass-surface rounded-2xl p-3">
              <div className={cn("aspect-[16/10] rounded-xl bg-gradient-to-br", tile.grad)} />
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="bg-foreground/[0.12] h-2.5 w-1/2 rounded" />
                <span className="bg-primary/15 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  {tile.price}
                </span>
              </div>
              <span className="bg-foreground/[0.06] mt-2 block h-2 w-3/4 rounded" />
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}

/**
 * Home-page presentation for each product. Copy, features, stack and links come from
 * `content/products.ts`; this only adds the headline treatment and illustration.
 */
const showcase: Record<string, { headline: ReactNode; mockup: ReactNode }> = {
  devstore: {
    headline: (
      <>
        DevStore — developer products, <GradientText>ready to ship</GradientText>
      </>
    ),
    mockup: <DevStoreMockup />,
  },
  gocart: {
    headline: (
      <>
        Go Cart — your Shopify store as a <GradientText>native app</GradientText>
      </>
    ),
    mockup: <GoCartMockup />,
  },
};

function ProductSpotlight({ product, reverse }: { product: Product; reverse: boolean }) {
  const presentation = showcase[product.slug];

  return (
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      {/* The pitch */}
      <div>
        <Reveal direction="none">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-primary/12 text-primary rounded-full px-3 py-1 text-xs font-medium">
              {product.category}
            </span>
            <span className="bg-foreground/[0.06] text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
              {product.status}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            {presentation?.headline ?? product.name}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-5 text-pretty leading-relaxed">
            {product.summary}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {product.features.slice(0, 4).map((feature) => {
              const Icon = getIcon(feature.icon);
              return (
                <li key={feature.title} className="flex gap-3.5">
                  <span className="bg-primary/12 text-primary ring-primary/15 flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">{feature.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic strength={0.3}>
              <Button asChild size="lg">
                <SiteLink href={product.href} external={product.external}>
                  {product.cta}
                  <ArrowRight className="size-4" />
                </SiteLink>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
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

      {/* The illustration — alternates sides on large screens */}
      {presentation && (
        <Reveal
          direction={reverse ? "right" : "left"}
          delay={0.1}
          className={cn(reverse && "lg:order-first")}
        >
          {presentation.mockup}
        </Reveal>
      )}
    </div>
  );
}

export function OurProduct() {
  return (
    <Section id="product" className="relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Our products"
          title={
            <>
              Software we <GradientText>build and run</GradientText>
            </>
          }
          description="Our own products — designed, built and maintained end-to-end by Aadhya Infotech."
        />

        <div className="mt-16 flex flex-col gap-24 lg:mt-20 lg:gap-32">
          {products.map((product, index) => (
            <ProductSpotlight key={product.slug} product={product} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
