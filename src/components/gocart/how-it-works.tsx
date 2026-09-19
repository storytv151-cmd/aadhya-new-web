import { Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { getIcon } from "@/components/sections/icon-map";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartSteps } from "@/content/gocart";

export function GoCartHowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From Shopify store to app in <GradientText>three steps</GradientText>
            </>
          }
          description="No code and nothing to rebuild — your app runs on the store you already have."
        />

        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {goCartSteps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <li key={step.title}>
                <Reveal delay={index * 0.1} className="h-full">
                  <Glass specular interactive className="flex h-full flex-col rounded-[2rem] p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="glass-floating text-primary flex size-14 items-center justify-center rounded-[1.1rem]">
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Glass>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
