import Link from "next/link";
import { ArrowRight, KeyRound, LayoutDashboard, ShieldCheck, TicketPercent } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button, Container, Eyebrow, Glass, GradientText, Magnetic, Reveal, Section } from "@/ui";
import { cn } from "@/utils";

/** DevStore's live URL. Update to the real deployment when it changes. */
const DEVSTORE_URL = "https://devstore.aadhya-infotech.com";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Enterprise RBAC",
    description: "One owner, unlimited staff — governed by granular roles and permissions.",
  },
  {
    icon: KeyRound,
    title: "Passwordless auth",
    description: "Secure magic-link sign-in for staff and customers. No passwords to leak.",
  },
  {
    icon: TicketPercent,
    title: "Licensing & releases",
    description: "License keys, versioned releases and lifetime updates, out of the box.",
  },
  {
    icon: LayoutDashboard,
    title: "Full admin suite",
    description: "Products, coupons, reviews, support and analytics in one dashboard.",
  },
];

const stack = ["Next.js 15", "NestJS", "PostgreSQL", "Prisma", "Redis"];

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
            devstore.aadhya-infotech.com
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

export function OurProduct() {
  return (
    <Section id="product" className="relative overflow-hidden">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — the pitch */}
        <div>
          <Reveal direction="none">
            <Eyebrow>Our product</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              DevStore — developer products, <GradientText>ready to ship</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-5 text-pretty leading-relaxed">
              Our own single-vendor storefront platform for premium templates, UI kits and starter
              projects — with license keys, versioned releases and lifetime updates. Designed, built
              and run by Aadhya Infotech.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-3.5">
                  <span className="bg-primary/12 text-primary ring-primary/15 flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset">
                    <feature.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic strength={0.3}>
                <Button asChild size="lg">
                  <a href={DEVSTORE_URL} target="_blank" rel="noopener noreferrer">
                    Visit DevStore
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </Magnetic>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary group inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                Talk to us about it
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((tech) => (
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

        {/* Right — a DevStore storefront mockup */}
        <Reveal direction="left" delay={0.1}>
          <DevStoreMockup />
        </Reveal>
      </Container>
    </Section>
  );
}
