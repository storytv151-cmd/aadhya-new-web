import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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
import { Cursor } from "@/components/aurora/cursor";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Aurora type: Space Grotesk for everything, Instrument Serif italics for accents,
// JetBrains Mono for small labels.
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

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
  // No site-wide share image yet, so the small "summary" card; pages with an image pass it
  // to pageMetadata() and get the large card.
  twitter: {
    card: "summary",
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
    { media: "(prefers-color-scheme: light)", color: "#f5f4ff" },
    { media: "(prefers-color-scheme: dark)", color: "#07060d" },
  ],
};

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(sans.variable, serif.variable, mono.variable)}>
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
              <Cursor />
            </LenisProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
