"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks";
import { formatNumber } from "@/utils";
import { cn } from "@/utils";

export type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts up to `value` when scrolled into view. Jumps straight to the value under reduced motion. */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 });
  const [display, setDisplay] = useState(() => format(0, decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(format(value, decimals));
      return;
    }
    motionValue.set(value);
  }, [inView, reduced, value, decimals, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(format(latest, decimals));
    });
    return () => unsubscribe();
  }, [spring, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function format(value: number, decimals: number): string {
  return formatNumber(Number(value.toFixed(decimals)), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
