"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useMotionEnabled } from "@/hooks";

/**
 * Smooth scroll — gated. Native scroll is used until the component is mounted and
 * confirmed to be a fine-pointer device without a reduced-motion preference, so
 * touch and reduced-motion users keep native scrolling (better INP + a11y).
 *
 * Lenis is attached imperatively to the root scroller rather than via <ReactLenis>:
 * switching the returned element from a fragment to a provider once `enabled` flipped
 * made React unmount and remount the entire page tree right after hydration.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const enabled = useMotionEnabled();

  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, [enabled]);

  return <>{children}</>;
}
