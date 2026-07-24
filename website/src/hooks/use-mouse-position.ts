"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/** Tracks the cursor as motion values (viewport coordinates in px). */
export function useMousePosition(): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [x, y]);

  return { x, y };
}
