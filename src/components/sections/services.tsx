import { Container, Glass, GradientText, Reveal, Section } from "@/ui";
import { cn } from "@/utils";
import { getServices } from "@/lib/content";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";

export async function Services() {
  const services = await getServices();

  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything you need to <GradientText>design, build & scale</GradientText>
            </>
          }
          description="One team for the whole journey — from a first idea to a shipped product and the growth that follows."
        />

        {/* Asymmetric bento — first & last cards span wide */}
        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const wide = index === 0 || index === services.length - 1;
            return (
              <Reveal
                key={service.slug}
                delay={(index % 4) * 0.05}
                className={cn(wide && "lg:col-span-2")}
              >
                <Glass
                  specular
                  interactive
                  className={cn(
                    "flex h-full flex-col rounded-[2rem] p-7",
                    wide && "lg:flex-row lg:gap-7",
                  )}
                >
                  <span className="bg-primary/12 text-primary ring-primary/15 flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset">
                    <Icon className="size-6" />
                  </span>
                  <div className={cn("flex flex-1 flex-col", wide ? "mt-0" : "mt-5")}>
                    <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="bg-foreground/[0.06] text-foreground-secondary rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Glass>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
