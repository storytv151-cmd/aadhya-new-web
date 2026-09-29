"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useMotionEnabled } from "@/hooks";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let current: Lenis | null = null;

/** The live Lenis instance, or null on touch / reduced-motion devices (native scroll). */
export function getLenis(): Lenis | null {
  return current;
}

/**
 * Smooth scroll — gated. Native scroll is used until the component is mounted and
 * confirmed to be a fine-pointer device without a reduced-motion preference, so
 * touch and reduced-motion users keep native scrolling (better INP + a11y).
 *
 * Lenis runs on GSAP's ticker and reports every scroll to ScrollTrigger, so pinned and
 * scrubbed sections move in the same frame as the page instead of one frame behind.
 * It is attached imperatively to the root scroller rather than via <ReactLenis>:
 * switching the returned element from a fragment to a provider once `enabled` flipped
 * made React unmount and remount the entire page tree right after hydration.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const enabled = useMotionEnabled();

  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false });
    current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      current = null;
    };
  }, [enabled]);

  return <>{children}</>;
}
