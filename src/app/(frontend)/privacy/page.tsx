import type { Metadata } from "next";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What Aadhya Infotech collects on this website, in the Go Cart dashboard and in apps built with Go Cart, why, and how to have it deleted.",
  path: "/privacy",
});

const UPDATED = "21 September 2026";

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

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Container className="text-muted-foreground mx-auto max-w-2xl space-y-10 py-16 lg:py-24">
        <p className="text-sm">Last updated: {UPDATED}</p>

        <p>
          Aadhya Infotech ({siteConfig.contact.address}) builds software, including{" "}
          <strong className="text-foreground">Go Cart</strong>, which turns a Shopify store into a
          branded mobile app. This policy covers three groups of people: visitors to this website,
          merchants who use the Go Cart dashboard, and shoppers who use an app a merchant published
          with Go Cart. Questions or deletion requests: <Mail />.
        </p>

        <Section title="Visitors to this website">
          <p>
            The contact form asks for your name, email address, phone number, company and message;
            the newsletter box asks only for an email address. We email those details to ourselves
            so we can reply — they are not stored in a database, sold, or used for advertising.
          </p>
          <p>
            This site sets no advertising or analytics cookies and embeds no third-party trackers.
          </p>
        </Section>

        <Section title="Merchants using Go Cart">
          <p>We keep the account you create and the connection to your store:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>your name, email address, phone number and a hashed password (never the password itself);</li>
            <li>your Shopify store domain and the access token Shopify issues when you install the app;</li>
            <li>your app settings — name, colours, tabs, banner, notification and automation setup;</li>
            <li>
              billing records: plan, status and payment history. If you installed Go Cart from
              the Shopify App Store you are billed by Shopify; if you signed up outside Shopify,
              Razorpay processes your subscription payments — either way, card details never
              reach our servers.
            </li>
          </ul>
          <p>
            With your permission the app reads — and only reads — your Shopify products, orders,
            customers, inventory and fulfillments. It never changes anything in your store. That
            data is used to show your catalogue and customers in the dashboard, to target push
            notifications, and to run the automations you switch on (welcome, abandoned cart, order
            shipped, back in stock). We keep a checkout reference and a customer id for an abandoned
            checkout only until the reminder is sent or the order completes.
          </p>
        </Section>

        <Section title="Shoppers using an app built with Go Cart">
          <p>
            The app shows the merchant&apos;s own website. The merchant decides what happens with
            this data; we process it on their behalf. Per device we keep:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>a random device identifier and the push token needed to deliver notifications;</li>
            <li>app events — install, app opens, and whether a notification was opened;</li>
            <li>&ldquo;Notify me&rdquo; requests: the product and variant you asked to be told about;</li>
            <li>
              if you sign in to the store inside the app, the Shopify customer id, name and email of
              that account, so the merchant can send you an order update or reach you as a customer.
            </li>
          </ul>
          <p>
            We do not track you across other apps or websites, show advertising, or sell any of
            this. Turn notifications off in your phone&apos;s settings at any time; uninstalling the
            app stops all collection.
          </p>
        </Section>

        <Section title="Who else processes this data">
          <p>
            Shopify (store data, and billing for merchants who installed from the Shopify App
            Store), Google Firebase Cloud Messaging (delivering push notifications), DigitalOcean
            (the servers the app runs on), Razorpay (subscription payments, only for merchants who
            signed up outside Shopify) and our email provider (contact-form and login emails).
            Each receives only what its job needs.
          </p>
        </Section>

        <Section title="How long we keep it, and deletion">
          <p>
            The moment a merchant uninstalls Go Cart, Shopify tells us and we delete the access
            token, disconnect the store and stop every automation. About two days later Shopify
            asks us to redact that shop: we then erase the Shopify customer details (id, name,
            email) held against each device and delete the store&apos;s abandoned-checkout and
            &ldquo;Notify me&rdquo; records. When Shopify asks us to redact a single customer, we do
            the same for that person straight away.
          </p>
          <p>
            What remains after a redaction is the merchant&apos;s own material — their app settings
            and the anonymous device records their app created — and that is deleted when the
            merchant deletes the app or their Go Cart account, which also removes their
            notifications and billing history.
          </p>
          <p>
            You can ask us for a copy of your data or ask us to delete it by writing to <Mail />. If
            you are a shopper, you can also ask the store you shopped with; they can have their
            records removed through Shopify.
          </p>
        </Section>

        <Section title="Security">
          <p>
            Everything travels over HTTPS. Passwords are stored as bcrypt hashes, dashboard sessions
            use short-lived tokens, and access to the servers and database is limited to our team.
            No system is perfect, so if we ever discover a breach affecting your data we will tell
            you and Shopify promptly.
          </p>
        </Section>

        <Section title="Children">
          <p>
            Go Cart and this website are meant for businesses and are not directed at children under
            16. We do not knowingly collect their data.
          </p>
        </Section>

        <Section title="Where data is processed">
          <p>
            Our servers and the services above may process and store data outside your country. We
            use providers that commit to protecting it under applicable data-protection laws.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If this policy changes, the date at the top changes with it, and we will tell merchants
            in the dashboard before anything material takes effect.
          </p>
        </Section>
      </Container>
    </main>
  );
}
