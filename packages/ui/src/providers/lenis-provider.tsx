"use client";

import { ReactLenis } from "lenis/react";
import { useMotionEnabled } from "@aadhya/hooks";
import type { ReactNode } from "react";

/**
 * Smooth scroll — gated. Native scroll is used until the component is mounted and
 * confirmed to be a fine-pointer device without a reduced-motion preference, so
 * touch and reduced-motion users keep native scrolling (better INP + a11y).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const enabled = useMotionEnabled();

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
