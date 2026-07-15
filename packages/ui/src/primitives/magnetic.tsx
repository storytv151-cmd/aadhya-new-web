"use client";

import { m } from "motion/react";
import { useMagnetic, useMotionEnabled } from "@aadhya/hooks";
import { cn } from "@aadhya/utils";
import type { ReactNode } from "react";

export type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Wraps children in a magnetic hover effect. Falls back to a static inline-block
 * on touch / reduced-motion devices (the hook still runs to keep hook order stable).
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const enabled = useMotionEnabled();
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLSpanElement>(strength);

  if (!enabled) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <m.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </m.span>
  );
}
