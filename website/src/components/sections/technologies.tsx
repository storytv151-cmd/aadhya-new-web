import { Container, Marquee, Section } from "@/ui";
import type { Technology } from "@/types";
import { getTechnologies } from "@/lib/content";
import { SectionHeading } from "./section-heading";

function TechPill({ tech }: { tech: Technology }) {
  return (
    <div className="glass-surface flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium">
      <span className="from-brand-from to-brand-to size-2 rounded-full bg-gradient-to-r" />
      {tech.name}
    </div>
  );
}

export async function Technologies() {
  const technologies = await getTechnologies();
  const mid = Math.ceil(technologies.length / 2);
  const rowOne = technologies.slice(0, mid);
  const rowTwo = technologies.slice(mid);

  return (
    <Section id="technologies" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Our stack"
          title="Built with advanced technology"
          description="A modern, battle-tested toolset across front-end, back-end, mobile and cloud."
        />
      </Container>

      <div className="mt-16 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee>
          {rowOne.map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowTwo.map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
