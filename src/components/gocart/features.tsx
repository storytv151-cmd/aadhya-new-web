import { Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { cn } from "@/utils";
import { getIcon } from "@/components/sections/icon-map";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartFeatures } from "@/content/gocart";

export function GoCartFeatures() {
  return (
    <Section id="features">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything your store needs, <GradientText>in an app</GradientText>
            </>
          }
          description="Native extras on top of the store your customers already know — plus the tools to bring them back."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goCartFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              // 9 cards: the first spans two columns at sm so the 2-column grid ends even.
              <li key={feature.title} className={cn(index === 0 && "sm:col-span-2 lg:col-span-1")}>
                <Reveal delay={(index % 3) * 0.05} className="h-full">
                  <Glass specular interactive className="flex h-full flex-col gap-4 rounded-[1.75rem] p-6">
                    <span className="bg-primary/12 text-primary ring-primary/15 flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Glass>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
