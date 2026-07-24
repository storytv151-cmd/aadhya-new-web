"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";
import type { ReactNode } from "react";

export type ParallaxProps = {
  children: ReactNode;
  /** Positive drifts slower/up, negative drifts the other way. ~0.1–0.5 feels good. */
  speed?: number;
  className?: string;
};

/** Scroll-linked vertical parallax. Disabled under reduced motion. */
export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = reduced ? 0 : speed * 90;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <m.div ref={ref} style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </m.div>
  );
}
