import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "@/ui";
import { cn } from "@/utils";
import { SiteLink } from "@/components/layout/site-link";

/** Pill link whose fill rises on hover while the label rolls up; magnetic on desktop. */
export function AuroraButton({
  href,
  children,
  variant = "solid",
  arrow = false,
  cursor,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "light";
  arrow?: boolean;
  cursor?: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <Magnetic strength={0.3}>
      <SiteLink
        href={href}
        external={external}
        data-cursor={cursor}
        className={cn("aur-btn", variant === "ghost" && "is-ghost", variant === "light" && "is-light", className)}
      >
        <span className="aur-roll">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
        {arrow && <ArrowRight aria-hidden="true" className="aur-arr" />}
      </SiteLink>
    </Magnetic>
  );
}
