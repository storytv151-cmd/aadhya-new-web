import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container } from "@aadhya/ui";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Aadhya Infotech. We're always looking for talented engineers, designers and problem-solvers.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Careers"
        title="Grow with us"
        description="We're always looking for talented engineers, designers and problem-solvers to join the team."
      />
      <Container className="py-16 text-center lg:py-24">
        <p className="text-muted-foreground mx-auto max-w-xl">
          We don&rsquo;t have any public openings listed right now, but we&rsquo;d still love to
          hear from great people. Send your portfolio or CV to{" "}
          <a className="text-primary font-medium" href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <Button asChild className="mt-8">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </Container>
    </main>
  );
}
