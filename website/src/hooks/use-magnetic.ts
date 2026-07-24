"use client";

import { useRef, type PointerEvent } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

export type MagneticControls<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<T>) => void;
  onPointerLeave: () => void;
};

/**
 * Magnetic hover: the element eases toward the cursor while hovered and springs
 * back on leave. Callers should gate this with `useMotionEnabled()` and pass the
 * returned handlers + motion values to a `motion` element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 0.35,
): MagneticControls<T> {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const onPointerMove = (event: PointerEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, onPointerMove, onPointerLeave };
}
