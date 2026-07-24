"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

/** True when the user has requested reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on coarse-pointer (touch) devices — used to gate desktop-only effects. */
export function useIsTouchDevice(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

/** True once the component has mounted on the client (avoids hydration mismatch). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Whether rich JS-driven motion should run: enabled only on fine-pointer
 * (desktop-ish) devices without a reduced-motion preference.
 */
export function useMotionEnabled(): boolean {
  const reduced = useReducedMotion();
  const touch = useIsTouchDevice();
  const mounted = useMounted();
  return mounted && !reduced && !touch;
}
