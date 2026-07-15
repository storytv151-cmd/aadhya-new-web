"use client";

import { useMotionEnabled } from "@aadhya/hooks";
import { cn } from "@aadhya/utils";

/**
 * Calm atmospheric backdrop. A single soft aurora field lives LOW on the page —
 * behind the hero, never behind the navigation. A top-down mask keeps the first
 * ~150px perfectly neutral and fades the aurora in gradually, so there is no bright
 * band, hotspot, or hard seam near the top edge. One continuous atmosphere, minimal
 * layers. Static under reduced-motion / touch. Purely decorative.
 */
export function AuroraBackground({ className }: { className?: string }) {
  const animate = useMotionEnabled();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-background pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Aurora field — masked so the top stays neutral (behind the nav) and the glow
          fades in gradually lower, behind the hero. The mask governs every glow at once,
          so animation drift can never push brightness up to the top edge. */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, transparent 150px, #000 55vh, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, transparent 150px, #000 55vh, #000 100%)",
        }}
      >
        {/* primary bloom — large, very soft, centred low behind the hero */}
        <div
          className={cn(
            "absolute left-1/2 top-[54%] size-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "opacity-[0.09] blur-[210px] dark:opacity-[0.10]",
            "bg-[radial-gradient(circle_at_center,var(--brand-from),transparent_72%)]",
            animate && "animate-aurora",
          )}
        />
        {/* faint secondary tint — lower-right, for organic colour variation only */}
        <div
          className={cn(
            "absolute left-[66%] top-[78%] size-[85vmax] -translate-x-1/2 -translate-y-1/2 rounded-full",
            "opacity-[0.05] blur-[200px] dark:opacity-[0.06]",
            "bg-[radial-gradient(circle_at_center,var(--accent-indigo),transparent_72%)]",
            animate && "animate-aurora [animation-delay:-18s]",
          )}
        />
      </div>

      {/* whisper of grain — uniform; also dithers out any faint gradient banding */}
      <div
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
}
