import { cn } from "@/utils";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

/** Centered max-width content wrapper with responsive gutters. */
export function Container({
  className,
  as: Tag = "div",
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType; children: ReactNode }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)} {...props}>
      {children}
    </Tag>
  );
}

/** Vertical section rhythm wrapper. */
export function Section({
  className,
  as: Tag = "section",
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType; children: ReactNode }) {
  return (
    <Tag className={cn("relative py-20 sm:py-28 lg:py-32", className)} {...props}>
      {children}
    </Tag>
  );
}

/** Small eyebrow label used above section headings. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "border-border bg-accent/40 text-accent-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest",
        className,
      )}
    >
      {children}
    </span>
  );
}
