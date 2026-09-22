import type { Metadata } from "next";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { goCartPlans, yearlyPrice } from "@/content/gocart";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern the use of the Aadhya Infotech website and of Go Cart: plans and billing, cancellation, publishing, acceptable use and liability.",
  path: "/terms",
  noIndex: true,
});

const UPDATED = "22 September 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Mail() {
  return (
    <a className="text-primary font-medium" href={`mailto:${siteConfig.contact.email}`}>
      {siteConfig.contact.email}
    </a>
  );
}

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <Container className="text-muted-foreground mx-auto max-w-2xl space-y-10 py-16 lg:py-24">
        <p className="text-sm">Last updated: {UPDATED}</p>

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
            If you install Go Cart from the Shopify App Store, Shopify bills you: the plan appears
            on your regular Shopify invoice, in US dollars, and is charged monthly or yearly in
            advance. If you sign up for Go Cart outside Shopify, Razorpay bills you in Indian rupees
            on the same monthly or yearly terms. We take no commission or fee on the orders placed
            in your app. Prices exclude any taxes that apply to you, and we may change them for
            future billing periods with notice in the dashboard or by email.
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
            You can cancel at any time from the plan page in Go Cart or by uninstalling the app from
            your Shopify admin; standalone accounts cancel from the Go Cart dashboard. Your app and
            dashboard keep working until the end of the period you have already paid for, after
            which the subscription ends and no further charge is made. We do not refund partial
            months or years, except where the law requires us to.
          </p>
        </Section>

        <Section title="Your responsibilities">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Apps are published under your own Google Play Console and Apple Developer Program
              accounts. You open and pay for those accounts and keep them in good standing.
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
