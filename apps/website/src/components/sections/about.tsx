import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button, Container, Eyebrow, Glass, Reveal, Section } from "@aadhya/ui";
import { getAboutContent } from "@/lib/content";

export function About() {
  const about = getAboutContent();

  return (
    <Section id="about" className="relative overflow-hidden">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal direction="none">
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              {about.title}
            </h2>
          </Reveal>
          {about.body.map((paragraph, index) => (
            <Reveal key={index} delay={0.1 + index * 0.05}>
              <p className="text-muted-foreground mt-5 text-pretty leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.25}>
            <ul className="mt-7 space-y-3.5">
              {about.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3">
                  <span className="bg-primary/12 text-primary flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3" />
                  </span>
                  <span className="text-foreground-secondary">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35}>
            <Button asChild variant="outline" className="mt-9">
              <Link href="/about">
                Learn more about us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Calm editorial visual — a single elegant glass statement, no bars or stats */}
        <Reveal direction="left" delay={0.1}>
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_66%)] opacity-[0.1] blur-3xl"
            />
            <Glass strength="floating" specular className="rounded-[2rem] p-9">
              <span className="text-primary/25 text-6xl font-semibold leading-none">&ldquo;</span>
              <p className="mt-2 text-balance text-xl font-medium leading-relaxed tracking-tight">
                We treat every product like our own — crafted with intent, engineered to last, and
                shipped with care.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-white/[0.06] pt-6">
                <span className="from-brand-from to-brand-to flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white">
                  A
                </span>
                <div>
                  <div className="text-sm font-semibold">Aadhya Infotech</div>
                  <div className="text-muted-foreground text-xs">Software Studio</div>
                </div>
              </div>
            </Glass>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
