import Link from "next/link";
import type { ComponentProps } from "react";

export type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  /**
   * The target is served by another app on this domain (e.g. /DevStore), so it needs a
   * full page load — next/link would try to route it client-side inside this app and 404.
   */
  external?: boolean;
};

/** next/link for this app's own routes; a plain <a> for other apps sharing the domain. */
export function SiteLink({ href, external = false, ...props }: SiteLinkProps) {
  return external ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}
