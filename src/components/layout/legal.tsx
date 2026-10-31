import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

/** Building blocks shared by the legal pages: /privacy, /terms and /refund-policy. */

/** One titled section of a legal page. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-foreground text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

/** The site's contact email as a mailto link. */
export function Mail() {
  return (
    <a className="text-primary-text font-medium" href={`mailto:${siteConfig.contact.email}`}>
      {siteConfig.contact.email}
    </a>
  );
}
