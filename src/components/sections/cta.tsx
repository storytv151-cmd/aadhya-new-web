import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, GradientText, Magnetic, Reveal, Section } from "@/ui";

export function CTA() {
  return (
    <Section id="cta">
      <Container>
        <Reveal>
          <div className="glass-showcase relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center sm:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 size-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_60%)] opacity-20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Ready to build something <GradientText>extraordinary?</GradientText>
              </h2>
              <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-pretty text-lg">
                Let&rsquo;s turn your idea into a software masterpiece. Tell us about your project
                and we&rsquo;ll get back to you fast.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic strength={0.35}>
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Let&rsquo;s Connect
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <Button asChild size="lg" variant="glass">
                    <Link href="/portfolio">View our work</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
