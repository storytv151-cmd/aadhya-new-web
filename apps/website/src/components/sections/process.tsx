import { Container, Reveal, Section } from "@aadhya/ui";
import { getProcessSteps } from "@/lib/content";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";

export async function Process() {
  const steps = await getProcessSteps();

  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from idea to launch"
          description="A structured, transparent process — so you always know exactly what happens next."
        />

        <div className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-4 lg:gap-x-12">
          {steps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <Reveal key={step.step} delay={index * 0.1} className="relative">
                <div className="glass-floating text-primary relative z-10 flex size-16 items-center justify-center rounded-[1.25rem]">
                  <Icon className="size-7" />
                  <span className="bg-primary text-primary-foreground shadow-glow absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full text-xs font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
