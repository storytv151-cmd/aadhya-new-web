import { SectionTitle } from "@/components/aurora/section-title";
import { Container } from "@/ui";

/**
 * Inner-page header in the Aurora style: aurora glow, a mono kicker and a big title whose
 * words rise in. Wrap a word in *…* to set it in the serif italic.
 */
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
    <section className="border-border relative isolate overflow-hidden border-b pb-16 pt-36 lg:pb-20 lg:pt-44">
      <div aria-hidden="true" className="aur-aurora -z-10">
        <i />
        <i />
        <i />
      </div>
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <Container>
        <SectionTitle as="h1" kicker={eyebrow} title={title} description={description} className="mb-0 lg:mb-0" />
      </Container>
    </section>
  );
}
