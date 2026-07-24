/**
 * Design tokens for JavaScript/motion consumers.
 *
 * Colours here are for the few places JS needs raw values (theme-color meta tags,
 * JSON-LD, canvas/SVG gradients). Everything visual in the DOM should prefer the
 * Tailwind utilities backed by `styles/theme.css`. Motion timing is mirrored from
 * the CSS custom properties in that file — keep the two in sync.
 */

export const brand = {
  primary: "#0467ff",
  surfaceDark: "#07080e",
  gradient: {
    from: "#0467ff",
    via: "#4361ff",
    to: "#22d3ee",
  },
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
} as const;

/** Aurora backdrop bloom colours — blue / cyan / indigo, kept subtle & neutral. */
export const aurora = {
  colors: ["#0467ff", "#38d7ff", "#5e6dff"],
} as const;

/** Seconds — Framer/Motion transitions consume these. */
export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  slower: 1.0,
} as const;

/** Cubic-bezier control points as mutable 4-tuples (Framer's `BezierDefinition`). */
export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  inOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Layering scale to keep stacking contexts predictable. */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  header: 1200,
  overlay: 1300,
  modal: 1400,
  toast: 1500,
} as const;

export type Brand = typeof brand;
export type Durations = typeof durations;
export type Easing = typeof easing;
