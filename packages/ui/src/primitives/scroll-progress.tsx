"use client";

import { m } from "motion/react";
import { useScrollProgress } from "@aadhya/hooks";
import { cn } from "@aadhya/utils";

/** Slim gradient page-scroll progress bar, pinned to the top of the viewport. */
export function ScrollProgressBar({ className }: { className?: string }) {
  const scaleX = useScrollProgress();
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn(
        "from-brand-from via-brand-via to-brand-to fixed inset-x-0 top-0 z-[1250] h-[3px] origin-left bg-gradient-to-r",
        className,
      )}
    />
  );
}
