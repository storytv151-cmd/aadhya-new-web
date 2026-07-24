import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import {
  AuroraBackground,
  GlassFilters,
  LenisProvider,
  MotionProvider,
  ScrollProgressBar,
} from "@/ui";
import { cn } from "@/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(GeistSans.variable, GeistMono.variable)}>
      {/* suppressHydrationWarning: browser extensions (ColorZilla's cz-shortcut-listen,
          Grammarly, etc.) mutate <body> before hydration; ignore those attribute diffs. */}
      <body
        suppressHydrationWarning
        className="bg-background text-foreground min-h-dvh font-sans antialiased"
      >
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AuroraBackground />
        <GlassFilters />
        <ThemeProvider>
          <MotionProvider>
            <ScrollProgressBar />
            <LenisProvider>
              <Navbar />
              {children}
              <Footer />
            </LenisProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
