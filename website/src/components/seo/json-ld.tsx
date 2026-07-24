/**
 * Renders a JSON-LD structured-data block. Server component; the inline script is
 * permitted by the site CSP (script-src includes 'unsafe-inline').
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
