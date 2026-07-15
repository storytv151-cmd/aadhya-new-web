"use client";

import { m, useMotionTemplate, useMotionValue } from "motion/react";
import { useMotionEnabled } from "@aadhya/hooks";
import { cn } from "@aadhya/utils";
import type { PointerEvent, ReactNode } from "react";

export type GlassProps = {
  children: ReactNode;
  className?: string;
  /** Material level. */
  strength?: "surface" | "default" | "floating" | "showcase";
  /** Brighten + lift on hover. */
  interactive?: boolean;
  /** Cursor-following specular highlight (desktop, motion-enabled only). */
  specular?: boolean;
  /** True SVG refraction — Chromium only, reserve for showpiece surfaces. */
  refract?: boolean;
};

const strengthClass = {
  surface: "glass-surface",
  default: "glass",
  floating: "glass-floating",
  showcase: "glass-showcase",
} as const;

/**
 * A Liquid Glass surface. Applies the shared glass utility plus an optional
 * cursor-tracked specular sheen and (Chromium) refraction. Content is layered
 * above the sheen so text stays legible.
 */
export function Glass({
  children,
  className,
  strength = "default",
  interactive = true,
  specular = false,
  refract = false,
}: GlassProps) {
  const enabled = useMotionEnabled();
  const showSpecular = specular && enabled;
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(55% 55% at ${px}% ${py}%, var(--glass-highlight), transparent 65%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width) * 100);
    py.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      onPointerMove={showSpecular ? handlePointerMove : undefined}
      className={cn(
        "group relative isolate overflow-hidden",
        strengthClass[strength],
        interactive && "glass-interactive",
        refract && "glass-refract",
        className,
      )}
    >
      {showSpecular && (
        <m.span
          aria-hidden="true"
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-90"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
