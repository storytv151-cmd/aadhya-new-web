import { Container, GradientText, Reveal, Section } from "@/ui";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartIntegrations } from "@/content/gocart";

/** "Works with what you already use" — every name here is supported in the app today. */
export function GoCartIntegrations() {
  return (
    <Section id="integrations">
      <Container>
        <SectionHeading
          eyebrow="Integrations"
          title={
            <>
              Works with what <GradientText>you already use</GradientText>
            </>
          }
          description="The app runs your live store, so your theme and Shopify apps come along. Checkout, tracking and UPI hand-offs stay inside the app instead of dropping shoppers into a browser."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
          {goCartIntegrations.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.06} className="h-full">
              <div className="glass-surface h-full rounded-[1.75rem] p-6">
                <h3 className="text-foreground text-sm font-semibold uppercase tracking-[0.12em]">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-border/70 bg-background/60 text-foreground rounded-full border px-3 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
