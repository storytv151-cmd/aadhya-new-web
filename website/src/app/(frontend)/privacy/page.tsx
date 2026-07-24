import type { Metadata } from "next";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aadhya Infotech collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Container className="prose-none text-muted-foreground mx-auto max-w-2xl space-y-4 py-16 lg:py-24">
        <p>
          Aadhya Infotech respects your privacy. This page will host our full privacy policy,
          describing what information we collect (such as details you submit via our contact form),
          how we use it to respond to and serve you, and how we keep it secure.
        </p>
        <p>
          We do not sell your personal information. If you have any questions about your data or
          wish to have it removed, contact us at{" "}
          <a className="text-primary font-medium" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <p className="text-sm">This policy is being finalized and will be updated shortly.</p>
      </Container>
    </main>
  );
}
