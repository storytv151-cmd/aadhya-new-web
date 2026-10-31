import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { Mail, Section } from "@/components/layout/legal";
import { POLICY_VERSION } from "@/content/legal";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Subscription, Cancellation & Refund Policy",
  description:
    "How Go Cart plans renew automatically, how you pay, how to cancel, and when Aadhya Infotech gives a refund.",
  path: "/refund-policy",
});

const UPDATED = "1 November 2026";

export default function RefundPolicyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Subscription, Cancellation & Refund Policy" />
      <Container className="text-muted-foreground mx-auto max-w-2xl space-y-10 py-16 lg:py-24">
        <p className="text-sm">
          Last updated: {UPDATED} ·{" "}
          <span className="whitespace-nowrap">Version {POLICY_VERSION}</span>
        </p>

        <p>
          This policy explains how <strong className="text-foreground">Go Cart</strong>{" "}
          subscriptions renew, how you pay, how to cancel and when you get a refund. Go Cart is sold
          to businesses by Aadhya Infotech ({siteConfig.contact.address}); &ldquo;you&rdquo; means
          the merchant who chooses a plan. This policy is part of our{" "}
          <Link className="text-primary-text font-medium" href="/terms">
            Terms of Service
          </Link>
          .
        </p>

        <Section title="Auto-renewal">
          <p>
            <strong className="text-foreground">
              Your plan renews automatically and we charge the payment method you authorised at the
              start of every billing period (monthly or yearly) until you cancel.
            </strong>
          </p>
          <p>
            There is no free trial. Your first billing period starts, and your first charge is
            made, when you choose a plan.
          </p>
        </Section>

        <Section title="What you authorise">
          <p>
            Checkout shows your plan, the amount and the billing period (monthly or yearly). When
            you confirm, you authorise us to charge that amount for that period, and to charge it
            again at the start of every new billing period, until you cancel.
          </p>
        </Section>

        <Section title="How you pay">
          <p>
            If you installed Go Cart from the Shopify App Store, you pay through Shopify (see
            &ldquo;Shopify merchants&rdquo; below). Everyone else pays through Razorpay
            Subscriptions, which charges your card in US dollars (USD) automatically for each
            billing period.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Cards issued in India must allow international (USD) payments, and Indian rules limit
              automatic card charges to about ₹15,000 each; for a larger plan your bank may ask you
              to approve each charge.
            </li>
            <li>Before each automatic charge, Razorpay sends you a pre-debit notification.</li>
            <li>After every charge, Razorpay sends you a receipt.</li>
          </ul>
        </Section>

        <Section title="Currency">
          <p>
            Razorpay charges in US dollars (USD); Shopify bills in US dollars too. Your bank may add
            currency-conversion fees.
          </p>
        </Section>

        <Section title="Taxes">
          <p>Prices are shown at checkout.</p>
        </Section>

        <Section title="How to cancel">
          <p>
            You can cancel at any time from Plan &amp; billing in the Go Cart dashboard. If you pay
            through Shopify, you can also cancel by uninstalling Go Cart from your Shopify admin.
          </p>
          <p>Your cancellation takes effect at the end of the period you have already paid for:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>until then, your app and dashboard keep working as normal;</li>
            <li>no further charge is made;</li>
            <li>7 days after the paid period ends, your app pauses for shoppers until you choose a plan again.</li>
          </ul>
        </Section>

        <Section title="Cancelling a card mandate">
          <p>
            Cancelling your plan in Plan &amp; billing stops all future charges, so you don&apos;t
            need to contact your bank. If you also want to remove the mandate on your card itself,
            ask the bank that issued your card.
          </p>
          <p>
            If you cancel only the card mandate and not your plan, your next charge fails and the rules
            under &ldquo;Failed payments&rdquo; apply. To end your plan, cancel it in Plan &amp;
            billing.
          </p>
        </Section>

        <Section title="Refunds">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              We do not refund partial months or years, except where the law requires us to. If you
              cancel partway through a billing period, you keep using Go Cart until that period
              ends instead.
            </li>
            <li>
              If you cancelled and we processed your cancellation late, we refund in full any charge
              made after you cancelled.
            </li>
          </ul>
          <p>
            To ask for a refund, write to <Mail /> with your store name, the email address of your
            Go Cart account, and the date and amount of the charge (or the receipt).
          </p>
          <p>
            A refund of a Razorpay payment goes back to the payment method you paid with. A refund
            of a Shopify charge is issued through Shopify.
          </p>
        </Section>

        <Section title="Failed payments">
          <p>
            If an automatic charge fails, Razorpay tries it again. If the payment has still not gone
            through 7 days after the due date, your plan stops and your app pauses for shoppers
            until you pay again from Plan &amp; billing.
          </p>
        </Section>

        <Section title="Price changes">
          <p>
            If we change a price, we give you at least 30 days&apos; notice by email and in the Go
            Cart dashboard. The new price applies from your first renewal after the notice period
            ends. If you don&apos;t want to pay it, you can cancel before then.
          </p>
        </Section>

        <Section title="Shopify merchants">
          <p>
            If you installed Go Cart from the Shopify App Store, Shopify&apos;s billing applies
            instead of Razorpay: you approve your plan on Shopify&apos;s own approval screen, and
            the charge appears on your Shopify invoice.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              To cancel, uninstall Go Cart from your Shopify admin or cancel from Plan &amp;
              billing.
            </li>
            <li>Refunds follow this policy and are issued through Shopify.</li>
          </ul>
        </Section>

        <Section title="Free plans">
          <p>
            The Go Cart team can give a merchant a free plan. You are not charged for a free plan.
            It can end on the date we gave you when we set it up; to keep using Go Cart after that,
            choose a paid plan in Plan &amp; billing.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If this policy changes, the date and version at the top change with it, and we will
            tell merchants in the dashboard before anything material takes effect.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about your plan, a charge, cancelling or a refund: write to <Mail />.
          </p>
        </Section>
      </Container>
    </main>
  );
}
