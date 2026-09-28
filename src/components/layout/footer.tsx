import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/ui";
import { footerColumns } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="relative pb-8 pt-10">
      <Container>
        <div className="glass rounded-[2.5rem] p-8 sm:p-12">
          {/* Below lg the link columns sit side by side (2 on phones, 3 from sm) with 44px-tall
              links for touch; from lg it is the original four-column row. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
            <div className="col-span-2 max-w-sm sm:col-span-3 lg:col-span-1">
              <Logo className="min-h-11 lg:min-h-0" />
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {siteConfig.description}
              </p>

              <ul className="mt-5 space-y-1 text-sm lg:mt-6">
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-foreground flex min-h-11 items-center gap-3 transition-colors"
                  >
                    <Phone className="text-primary size-4 shrink-0" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-muted-foreground hover:text-foreground flex min-h-11 items-center gap-3 transition-colors"
                  >
                    <Mail className="text-primary size-4 shrink-0" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground flex items-start gap-3 py-1 transition-colors"
                  >
                    <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                    {contact.address}
                  </a>
                </li>
              </ul>

              <NewsletterForm className="mt-8" />
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-foreground text-sm font-semibold">{column.title}</h3>
                <ul className="mt-2 lg:mt-4 lg:space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center text-sm transition-colors lg:min-h-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">Crafted with care · Surat, India</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
