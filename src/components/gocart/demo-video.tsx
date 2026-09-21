import { Container, GradientText, Reveal, Section } from "@/ui";
import { SectionHeading } from "@/components/sections/section-heading";
import { goCartDemoVideo } from "@/content/gocart";

/** A three-minute walkthrough recorded from the real dashboard and a phone. */
export function GoCartDemo() {
  return (
    <Section id="demo">
      <Container>
        <SectionHeading
          eyebrow="Demo"
          title={
            <>
              See Go Cart <GradientText>in action</GradientText>
            </>
          }
          description="Set up the app, open it on a phone with a preview code, send a push that lands a second later, then pick a plan and publish."
        />
        <Reveal delay={0.1}>
          <div className="glass-surface mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] p-2">
            <video
              className="aspect-video w-full rounded-[1.6rem] bg-black"
              controls
              playsInline
              preload="none"
              poster={goCartDemoVideo.poster}
            >
              <source src={goCartDemoVideo.src} type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
