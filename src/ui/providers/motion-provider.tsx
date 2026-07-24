"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads only the DOM animation feature set (~15kb → ~5kb) and enforces `m`
 * components via `strict`, keeping the motion bundle minimal. `reducedMotion="user"`
 * makes every animation honour the OS preference automatically.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
