import { cn } from "@aadhya/utils";
import type { ReactNode } from "react";

export type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  /** Pause the scroll on hover. */
  pauseOnHover?: boolean;
};

/**
 * Seamless horizontal marquee (e.g. technology logos). Pure CSS animation; the
 * content is duplicated for a gapless loop. Server component.
 */
export function Marquee({ children, className, reverse, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("group flex w-full overflow-hidden", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? "true" : undefined}
          className={cn(
            "animate-marquee flex shrink-0 items-center justify-around gap-12 pr-12",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
