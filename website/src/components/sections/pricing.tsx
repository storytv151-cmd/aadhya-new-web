import Link from "next/link";
import { Check } from "lucide-react";
import { Button, Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { cn } from "@/utils";
import { SectionHeading } from "./section-heading";

const tiers = [
  {
    name: "Launch",
    price: "Fixed",
    tagline: "For a well-defined project scope",
    features: ["Discovery & design", "Full build & QA", "Launch support", "30-day warranty"],
    cta: "Start a project",
    featured: false,
  },
  {
    name: "Scale",
    price: "Monthly",
    tagline: "An ongoing product partner",
    features: [
      "Dedicated team",
      "Continuous delivery",
      "Design + engineering",
      "Priority support",
      "Monthly roadmap",
    ],
    cta: "Talk to us",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For complex, large-scale needs",
    features: [
      "Custom SLAs",
      "Security & compliance",
      "Cloud & DevOps",
      "Dedicated architect",
      "24/7 support",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          eyebrow="Engagements"
          title={
            <>
              Ways to <GradientText>work together</GradientText>
            </>
          }
          description="Flexible engagement models tailored to your goals, timeline and budget — these are starting points, not fixed menus."
        />

        <div className="mt-14 grid items-center gap-4 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <Glass
                specular
                interactive
                strength={tier.featured ? "floating" : "default"}
                className={cn(
                  "relative flex h-full flex-col rounded-[2rem] p-8",
                  tier.featured && "lg:scale-[1.04] lg:py-10",
                )}
              >
                {tier.featured && (
                  <span className="bg-primary text-primary-foreground shadow-glow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
                <div className="text-muted-foreground text-sm font-medium">{tier.name}</div>
                <div className="mt-2 text-4xl font-bold tracking-tight">{tier.price}</div>
                <p className="text-muted-foreground mt-2 text-sm">{tier.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="text-primary size-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={tier.featured ? "default" : "glass"}
                >
                  <Link href="/contact">{tier.cta}</Link>
                </Button>
              </Glass>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
