import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/ui";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aadhya Infotech. Tell us about your app, web, game or design project and we'll get back to you fast.",
  alternates: { canonical: "/contact" },
};

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start gap-4"
      >
        <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors">
          <Icon className="size-5" />
        </span>
        <span>
          <span className="text-muted-foreground block text-sm">{label}</span>
          <span className="block font-medium">{value}</span>
        </span>
      </a>
    </li>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <main>
      <PageHeader
        eyebrow="Contact us"
        title="Let's build something great"
        description="Tell us about your project and goals. We usually respond within one business day."
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.5fr] lg:py-24">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <p className="text-muted-foreground mt-2">
              Prefer to reach out directly? Use any of the channels below.
            </p>
          </div>
          <ul className="space-y-6">
            <ContactItem
              icon={Phone}
              label="Phone"
              value={contact.phone}
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
            />
            <ContactItem
              icon={Mail}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactItem
              icon={MapPin}
              label="Office"
              value={contact.address}
              href={contact.mapsUrl}
            />
          </ul>
        </div>

        <div className="border-border bg-card shadow-soft rounded-3xl border p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
