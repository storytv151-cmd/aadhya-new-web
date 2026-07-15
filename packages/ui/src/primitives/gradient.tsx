import { cn } from "@aadhya/utils";
import type { ReactNode } from "react";

/** Brand gradient applied to text via background-clip. Server component (no JS). */
export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "from-brand-from via-brand-via to-brand-to bg-gradient-to-r bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Decorative animated gradient wash for section backgrounds. Uses a CSS keyframe
 * animation (compositor-friendly) and is purely presentational. Server component.
 */
export function AnimatedGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-gradient pointer-events-none absolute inset-0 -z-10 bg-[length:200%_200%] opacity-25 blur-3xl",
        "bg-[linear-gradient(120deg,var(--brand-from),var(--brand-via),var(--brand-to))]",
        className,
      )}
    />
  );
}

/** A soft radial glow blob for depth behind hero/CTA content. Server component. */
export function GlowBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 aspect-square rounded-full opacity-40 blur-3xl",
        "bg-[radial-gradient(circle_at_center,var(--brand-via),transparent_70%)]",
        className,
      )}
    />
  );
}
