import type { Metadata } from "next";
import { Container } from "@/ui";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern the use of the Aadhya Infotech website and services.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <Container className="text-muted-foreground mx-auto max-w-2xl space-y-4 py-16 lg:py-24">
        <p>
          These terms will govern your use of the Aadhya Infotech website and the services we
          provide. By using this site you agree to engage with us in good faith and to use the
          content and materials here for lawful purposes only.
        </p>
        <p>
          Project engagements are governed by separate agreements signed with each client. For
          questions about these terms or a specific engagement, contact us at{" "}
          <a className="text-primary font-medium" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <p className="text-sm">These terms are being finalized and will be updated shortly.</p>
      </Container>
    </main>
  );
}
