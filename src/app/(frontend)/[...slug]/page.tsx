import { notFound } from "next/navigation";

// Any URL no other route matches ends up here and renders this group's not-found.tsx —
// inside the site layout (header, footer, theme). Without it, unknown URLs got Next's bare
// default 404, because the root layout lives in this route group and there is no app-level
// not-found. Explicit routes (pages, robots.txt, sitemap.xml, icons) always win over this.
export default function UnknownPage() {
  notFound();
}
