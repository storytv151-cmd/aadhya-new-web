import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, GradientText, Magnetic, Reveal, TextReveal } from "@/ui";
import { getHeroContent } from "@/lib/content";
import { HeroShowcase } from "./hero-showcase";

export function Hero() {
  const hero = getHeroContent();

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      <Container className="relative flex flex-col items-center text-center">
        <Reveal direction="none">
          <span className="border-border text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium">
            <span className="bg-primary size-1.5 rounded-full" />
            {hero.eyebrow}
          </span>
        </Reveal>

        <h1 className="mx-auto mt-8 max-w-4xl text-balance text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-[5rem] lg:leading-[0.98]">
          <TextReveal text="We craft software" /> <GradientText>masterpieces</GradientText>
        </h1>

        <Reveal delay={0.2}>
          <p className="text-muted-foreground mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Magnetic strength={0.3}>
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Link
              href={hero.secondaryCta.href}
              className="text-foreground hover:text-primary group inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              {hero.secondaryCta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.4}>
        <Container className="mt-16 sm:mt-24">
          <HeroShowcase />
        </Container>
      </Reveal>
    </section>
  );
}
