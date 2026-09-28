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
          description="Three plans, each with everything in the one before: WebView runs your live website inside the app, Native builds your screens natively in code, and Brand does it for you."
        />

        <GoCartPricingPlans />

        <Reveal delay={0.1}>
          <p className="text-muted-foreground mx-auto mt-10 max-w-xl text-center text-sm">
            One price worldwide, in US dollars on your Shopify invoice (or the same amount in rupees
            by Razorpay if you sign up on our website). Yearly billing charges{" "}
            {YEARLY_MONTHS_CHARGED} months — 2 months free. Unlimited push notifications and app users on
            every plan. No free trial, no setup fee and no share of your sales. Publishing under Go
            Cart&rsquo;s developer account is included.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
