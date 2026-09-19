import { Container, GradientText, Reveal, Section } from "@/ui";
import { SectionHeading } from "@/components/sections/section-heading";
import { YEARLY_MONTHS_CHARGED } from "@/content/gocart";
import { GoCartPricingPlans } from "./pricing-plans";

export function GoCartPricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple plans, <GradientText>free for 14 days</GradientText>
            </>
          }
          description="Start with a 14-day free trial of Basic features, then pick a plan. Pay yearly and get 2 months free."
        />

        <GoCartPricingPlans />

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mx-auto mt-10 max-w-xl text-center text-sm">
            Prices in Indian rupees (INR). Yearly billing charges {YEARLY_MONTHS_CHARGED} months —
            2 months free.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
