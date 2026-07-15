"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import { transitions } from "@aadhya/config";
import { cn } from "@aadhya/utils";

export type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Word-by-word mask reveal (the signature hero effect). The `whileInView` trigger
 * lives on the parent — which always has a large, reliably-detected box — and drives
 * staggered child variants, rather than observing each clipped word individually.
 * Under reduced motion it renders plain, fully-visible text.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={cn("inline", className)}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "115%" },
    visible: { y: "0%", transition: transitions.slow },
  };

  return (
    <m.span
      className={cn("inline-block", className)}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {words.map((rawWord, index) => (
        <span
          key={`${rawWord}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <m.span variants={word} className="inline-block will-change-transform">
            {rawWord}
            {index < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
