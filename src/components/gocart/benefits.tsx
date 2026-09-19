import { Container, Eyebrow, GradientText, Reveal, Section } from "@/ui";
import { getIcon } from "@/components/sections/icon-map";
import { goCartBenefits } from "@/content/gocart";

/** "Why an app" band — qualitative benefits only (no figures, logos or testimonials). */
export function GoCartBenefits() {
  return (
    <Section id="why-an-app">
      <Container>
        <Reveal>
          <div className="glass-showcase relative overflow-hidden rounded-[2.5rem] px-6 py-12 sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1/4 top-0 size-[70%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_60%)] opacity-15 blur-3xl"
            />
            <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <Eyebrow>Why an app</Eyebrow>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                  A direct line to your <GradientText>most loyal shoppers</GradientText>
                </h2>
                <p className="text-muted-foreground mt-5 text-pretty leading-relaxed">
                  Your website wins new customers. An app keeps your store on their home screen and
                  gives you a channel you own to bring them back — without rebuilding what already
                  works on the web.
                </p>
              </div>

              <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                {goCartBenefits.map((benefit) => {
                  const Icon = getIcon(benefit.icon);
                  return (
                    <li key={benefit.title} className="flex gap-4">
                      <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold tracking-tight">{benefit.title}</h3>
                        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
