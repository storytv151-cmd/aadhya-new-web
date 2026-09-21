import { ArrowRight, Check, ChartColumn, IndianRupee } from "lucide-react";
import { Button, Container, Eyebrow, GradientText, Magnetic, Reveal, TextReveal } from "@/ui";
import { cn } from "@/utils";
import { goCartLinks, goCartTrust } from "@/content/gocart";
import { GoCartMockup } from "./phone-mockup";

/** The phone plus two small floating cards (UPI checkout, analytics) — decorative only. */
function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[22rem]">
      <GoCartMockup className="max-w-[19rem]" />

      {/* checkout paid — UPI-ready */}
      <div className="glass-floating absolute -left-6 bottom-40 z-20 hidden w-40 items-center gap-2.5 rounded-2xl p-2.5 sm:flex lg:-left-14">
        <span className="bg-primary/15 text-primary flex size-8 shrink-0 items-center justify-center rounded-xl">
          <IndianRupee className="size-4" />
        </span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="bg-foreground/[0.14] h-2 w-3/4 rounded" />
          <span className="flex items-center gap-1">
            <Check className="text-primary size-3" />
            <span className="bg-foreground/[0.07] h-2 flex-1 rounded" />
          </span>
        </span>
      </div>

      {/* app analytics — abstract bars, no figures */}
      <div className="glass-floating absolute -right-4 bottom-10 z-20 hidden w-36 flex-col gap-2 rounded-2xl p-3 sm:flex lg:-right-10">
        <span className="text-primary flex items-center gap-1.5">
          <ChartColumn className="size-3.5" />
          <span className="bg-foreground/[0.14] h-2 w-12 rounded" />
        </span>
        <span className="flex h-10 items-end gap-1.5">
          {["h-4", "h-6", "h-5", "h-8", "h-10"].map((height, i) => (
            <span
              key={i}
              className={cn("from-brand-from/70 to-brand-to/50 flex-1 rounded-t bg-gradient-to-t", height)}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function GoCartHero() {
  return (
    <section className="relative isolate overflow-hidden pb-10 pt-32 sm:pt-40 lg:pb-16">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <Reveal direction="none">
            <Eyebrow>Go Cart for Shopify</Eyebrow>
          </Reveal>

          <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[4.1rem] lg:leading-[1.02]">
            <TextReveal text="Turn your Shopify store into a" /> <GradientText>mobile app</GradientText>
          </h1>

          <Reveal delay={0.2}>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed lg:mx-0">
              Go Cart gives your store a branded Android and iOS app — your live store with native
              extras, push notifications, automations and India-ready checkout. No coding required.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            {/* The Go Cart dashboard is a separate app — plain <a> (full page load), not next/link. */}
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <Button asChild size="lg" className="w-full px-6 sm:w-auto sm:px-8">
                  <a href={goCartLinks.register}>
                    Get started
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <Button asChild size="lg" variant="glass" className="w-full sm:w-auto">
                  <a href={goCartLinks.login}>Log in</a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <ul className="text-muted-foreground mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm lg:justify-start">
              {goCartTrust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check aria-hidden="true" className="text-primary size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
