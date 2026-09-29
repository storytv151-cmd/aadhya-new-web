/**
 * Design tokens for JavaScript/motion consumers.
 *
 * Colours here are for the few places JS needs raw values (theme-color meta tags,
 * JSON-LD, canvas/SVG gradients). Everything visual in the DOM should prefer the
 * Tailwind utilities backed by `styles/theme.css`. Motion timing is mirrored from
 * the CSS custom properties in that file — keep the two in sync.
 */

export const brand = {
  primary: "#6f52ff",
  surfaceDark: "#07060d",
  surfaceLight: "#f5f4ff",
  gradient: {
    from: "#7c5cff",
    via: "#6a7bff",
    to: "#22d3ee",
  },
  lime: "#c6ff3d",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
} as const;

/** Aurora backdrop bloom colours — violet / cyan / lime. */
export const aurora = {
  colors: ["#7c5cff", "#22d3ee", "#c6ff3d"],
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
