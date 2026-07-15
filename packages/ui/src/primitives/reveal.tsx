"use client";

import { m } from "motion/react";
import { transitions, type RevealDirection } from "@aadhya/config";
import { cn } from "@aadhya/utils";
import type { ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  once?: boolean;
  /** Fraction of the element that must be visible to trigger (0..1). */
  amount?: number;
  className?: string;
};

const offsetFor = (direction: RevealDirection, distance: number): { x?: number; y?: number } => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * The workhorse scroll reveal. WAAPI-backed (transform/opacity run on the
 * compositor) and reduced-motion aware via the global `MotionConfig`.
 */
export function Reveal({
  children,
  direction = "up",
  distance = 28,
  delay = 0,
  once = true,
  amount = 0.3,
  className,
}: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, ...offsetFor(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...transitions.slow, delay }}
    >
      {children}
    </m.div>
  );
}
