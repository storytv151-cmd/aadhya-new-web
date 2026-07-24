"use client";

import { useScroll, useSpring, type MotionValue } from "motion/react";

/**
 * Smoothed page scroll progress in the range 0..1. Feed straight into a
 * `scaleX` transform for a progress bar.
 */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
}
