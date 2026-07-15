import { Container, Counter, Reveal, Section } from "@aadhya/ui";
import { getStats } from "@/lib/content";

export async function Stats() {
  const stats = await getStats();

  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <Reveal>
          {/* Subtle translucent glass: uniform fill, one very soft top reflection, a
              gentle bottom shadow. No internal glow, no dividers — spacing does the work. */}
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-14"
            style={{
              backgroundColor: "var(--glass-bg-strong)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 24%)",
              border: "1px solid var(--glass-border)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              backdropFilter: "blur(20px) saturate(140%)",
              boxShadow: "var(--glass-shadow)",
            }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.id}
                  delay={index * 0.08}
                  direction="none"
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-4xl font-bold tabular-nums leading-none tracking-tight sm:text-5xl">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-muted-foreground mt-1.5 text-sm">{stat.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
