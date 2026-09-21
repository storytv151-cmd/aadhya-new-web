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
              Simple plans, <GradientText>no commission</GradientText>
            </>
          }
          description="WebView apps are live today: your website runs inside the app, so everything on your store works from day one. Native apps with theme selection come next, with their own plans."
        />

        <GoCartPricingPlans />

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mx-auto mt-10 max-w-xl text-center text-sm">
            Prices in US dollars, on your Shopify invoice. Yearly billing charges{" "}
            {YEARLY_MONTHS_CHARGED} months — 2 months free. No free trial, no setup fee and no share
            of your sales. Apple and Google developer-account fees are paid to them directly.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
