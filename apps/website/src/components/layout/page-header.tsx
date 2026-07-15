import { AnimatedGradient, Container, Eyebrow, Reveal, TextReveal } from "@aadhya/ui";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-border relative isolate overflow-hidden border-b pb-16 pt-32">
      <AnimatedGradient className="opacity-20" />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <Container className="text-center">
        {eyebrow && (
          <Reveal direction="none">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          <TextReveal text={title} />
        </h1>
        {description && (
          <Reveal delay={0.2}>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-pretty text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
