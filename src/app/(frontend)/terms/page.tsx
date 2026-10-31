import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { Mail, Section } from "@/components/layout/legal";
import { goCartPlans, yearlyPrice } from "@/content/gocart";
import { POLICY_VERSION } from "@/content/legal";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern the use of the Aadhya Infotech website and of Go Cart: plans and billing, cancellation, publishing, acceptable use and liability.",
  path: "/terms",
  noIndex: true,
});

const UPDATED = "1 November 2026";

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <Container className="text-muted-foreground mx-auto max-w-2xl space-y-10 py-16 lg:py-24">
        <p className="text-sm">
          Last updated: {UPDATED} ·{" "}
          <span className="whitespace-nowrap">Version {POLICY_VERSION}</span>
        </p>

        <p>
          These terms are an agreement between you and Aadhya Infotech (
          {siteConfig.contact.address}). They cover this website and{" "}
          <strong className="text-foreground">Go Cart</strong>, our Shopify app. By using either,
          you agree to them. Custom software and design work for clients is governed by the
          separate agreement signed for each project, not by these terms.
        </p>

        <Section title="What Go Cart is">
          <p>
            Go Cart is a Shopify app that runs your Shopify store inside a branded Android and iOS
            mobile app. The app loads your live store, so your theme, content and installed Shopify
            apps keep working, and adds native extras on top — a tab bar, cart badge, promo banner,
            search bar and push notifications. You manage the app, its notifications and automations
            from the Go Cart dashboard. To use Go Cart you need a Shopify store that you are
            authorised to connect.
          </p>
        </Section>

        <Section title="Plans and billing">
          <p>Go Cart is sold as a subscription. The current plans are:</p>
          <ul className="list-disc space-y-1 pl-5">
            {goCartPlans.map((plan) => (
              <li key={plan.id}>
                <strong className="text-foreground">{plan.name}</strong>
                {` — $${plan.monthly}/month or $${yearlyPrice(plan)}/year`}
              </li>
            ))}
          </ul>
          <p>
            <strong className="text-foreground">
              Your plan renews automatically and we charge the payment method you authorised at the
              start of every billing period (monthly or yearly) until you cancel.
            </strong>
          </p>
          <p>
            If you install Go Cart from the Shopify App Store, Shopify bills you: the plan appears
            on your regular Shopify invoice, in US dollars, and is charged monthly or yearly in
            advance. If you sign up for Go Cart outside Shopify, Razorpay bills you in Indian rupees
            on the same monthly or yearly terms. We take no commission or fee on the orders placed
            in your app. Prices exclude any taxes that apply to you, and we may change them for
            future billing periods with at least 30 days&apos; notice by email and in the dashboard.
          </p>
          <p>
            If a Razorpay payment fails, Razorpay tries it again; if it has still not gone through 7
            days after its due date, your plan stops and your app pauses for shoppers until you pay
            again. Renewal, payment methods, failed payments and price changes are explained in
            full in our{" "}
            <Link className="text-primary-text font-medium" href="/refund-policy">
              Subscription, Cancellation &amp; Refund Policy
            </Link>
            , which is part of these terms.
          </p>
        </Section>

        <Section title="No free trial">
          <p>
            Go Cart has no free trial; your subscription starts when you choose a plan. Before your
            app is published you can see it on your own phone with the Go Cart Preview app, and you
            can cancel at any time as described below.
          </p>
        </Section>

        <Section title="Cancellation and refunds">
          <p>
            You can cancel at any time from Plan &amp; billing in the Go Cart dashboard or, if
            Shopify bills you, by uninstalling Go Cart from your Shopify admin. Your app and
            dashboard keep working until the end of the period you have already paid for, and no
            further charge is made; seven days later your app pauses for shoppers until you choose
            a plan again. We do not refund partial months or years, except where the law requires
            us to. The full rules, including how to ask for a refund and how to cancel a bank
            mandate, are in our{" "}
            <Link className="text-primary-text font-medium" href="/refund-policy">
              Subscription, Cancellation &amp; Refund Policy
            </Link>
            .
          </p>
        </Section>

        <Section title="Your responsibilities">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Apps are published either under Go Cart&apos;s developer accounts (included in every
              plan; we move the app to your own accounts on request) or, if you choose, under your
              own Google Play Console and Apple Developer Program accounts, which you open, pay for
              and keep in good standing.
            </li>
            <li>
              Your store — its products, prices, content and policies — is yours. Everything the app
              shows comes from it, and you are responsible for it being accurate and lawful.
            </li>
            <li>
              You are responsible for the push notifications you send and the automations you switch
              on: that their content is lawful, that you have any consent your customers&apos; laws
              require, and that they follow Google&apos;s and Apple&apos;s rules for notifications.
            </li>
            <li>
              You keep your Go Cart login and your Shopify access secure, and you are responsible for
              what is done through your account.
            </li>
          </ul>
        </Section>

        <Section title="Publishing to the app stores">
          <p>
            When you ask us to, we build your Android and iOS apps and submit them to Google Play
            and the App Store under your developer accounts, and we help you through the review.
            Whether an app is approved, and how long review takes, is decided by Google and Apple,
            not by us; if a store asks for changes we will work with you on them, but we cannot
            guarantee approval or a launch date.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>You agree not to use Go Cart or this website to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>sell or promote anything unlawful, or anything the app stores prohibit;</li>
            <li>send spam, misleading notifications, or messages to people who have not opted in;</li>
            <li>interfere with the service, probe or overload it, or get around its plan limits;</li>
            <li>copy, resell or reverse-engineer Go Cart, or use it for a store you are not authorised to run.</li>
          </ul>
          <p>
            We may suspend or close an account that breaks these rules or that puts the service, other
            merchants or shoppers at risk.
          </p>
        </Section>

        <Section title="Availability">
          <p>
            We run Go Cart on a best-effort basis and work to keep it available and up to date, but
            we do not guarantee any level of uptime. The service depends on Shopify, Google, Apple and
            Firebase, and it can be interrupted by them, by maintenance or by problems outside our
            control. We may change or retire features over time and will tell merchants in the
            dashboard before anything material changes.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            Go Cart and this website are provided as they are. To the extent the law allows, we are
            not liable for lost sales, lost profits, lost data or any indirect loss arising from
            their use, and our total liability to you for any claim is limited to the subscription
            fees you paid us in the three months before the claim arose. Nothing in these terms
            excludes liability that cannot be excluded by law.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            If these terms change, the date at the top changes with it, and we will tell merchants in
            the dashboard before anything material takes effect. Continuing to use Go Cart or this
            website after that means you accept the updated terms.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms, your plan or your account: write to <Mail />.
          </p>
        </Section>
      </Container>
    </main>
  );
}
