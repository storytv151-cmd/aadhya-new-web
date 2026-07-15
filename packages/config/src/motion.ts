import type { Transition, Variants } from "motion/react";
import { durations, easing } from "./tokens";

/**
 * Centralised motion vocabulary. These variants power the JS-driven layer of the
 * motion system (`m` components under `LazyMotion`). Native CSS scroll-driven
 * animations remain the default; reach for these only where JS is required.
 */

export const transitions = {
  base: { duration: durations.base, ease: easing.outExpo },
  slow: { duration: durations.slow, ease: easing.outExpo },
  quart: { duration: durations.base, ease: easing.outQuart },
  spring: { type: "spring", stiffness: 260, damping: 24, mass: 0.9 },
} satisfies Record<string, Transition>;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transitions.slow },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: transitions.slow },
};

/** Words/lines slide up from behind a mask (clip the parent with overflow-hidden). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: transitions.slow },
};

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/** Build a directional reveal variant with a configurable travel distance. */
export function createReveal(direction: RevealDirection = "up", distance = 28): Variants {
  const offset: Record<RevealDirection, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  return {
    hidden: { opacity: 0, ...offset[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: transitions.slow },
  };
}

/** Parent that staggers its children into view. */
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Child item to pair with `staggerContainer`. */
export const staggerItem: Variants = fadeInUp;
