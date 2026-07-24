import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Cpu, Eye, Headphones, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button, Container, Eyebrow, Glass, GradientText, Reveal, Section } from "@/ui";

const reasons: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: "Experienced Team",
    description: "Seasoned engineers and designers who have shipped products across industries.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description: "We build on current, proven stacks — no legacy shortcuts or technical debt.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description: "Clear communication and visible progress at every step of the project.",
  },
  {
    icon: Clock,
    title: "On-time Delivery",
    description: "Realistic timelines and dependable milestones you can plan around.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "We stay with you after launch — maintenance, improvements and guidance.",
  },
  {
    icon: BadgeCheck,
    title: "Quality First",
    description: "Clean, tested and maintainable code that is built to last and scale.",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="none">
            <Eyebrow>Why choose us</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              A partner you can <GradientText>rely on</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-5 text-pretty">
              We combine engineering rigor with design craft to deliver software that performs — and
              relationships that last.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild className="mt-8">
              <Link href="/contact">
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Feature rows */}
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 2) * 0.06}>
              <Glass specular interactive className="flex h-full gap-4 rounded-[1.75rem] p-6">
                <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset">
                  <reason.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{reason.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
