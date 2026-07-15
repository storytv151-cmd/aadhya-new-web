"use client";

import { Sparkles } from "lucide-react";
import { Glass } from "@aadhya/ui";
import { cn } from "@aadhya/utils";

/**
 * A single, restrained glass "app window" — abstract, calm UI shapes only
 * (no charts, stats or floating labels). The hero's one showcase element.
 */
export function HeroShowcase({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-3xl", className)}>
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-16 -top-6 bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_66%)] opacity-[0.12] blur-3xl"
      />

      <Glass
        strength="showcase"
        refract
        interactive={false}
        className="overflow-hidden rounded-[1.4rem]"
      >
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="flex gap-1.5">
            <span className="bg-foreground/15 size-2.5 rounded-full" />
            <span className="bg-foreground/15 size-2.5 rounded-full" />
            <span className="bg-foreground/15 size-2.5 rounded-full" />
          </span>
          <span className="glass-surface text-muted-foreground mx-auto rounded-full px-4 py-1 text-xs">
            aadhyainfotech.com
          </span>
        </div>

        {/* abstract content */}
        <div className="flex gap-4 p-5 sm:p-6">
          <div className="hidden w-12 shrink-0 flex-col items-center gap-3 sm:flex">
            <span className="bg-primary/12 text-primary flex size-9 items-center justify-center rounded-xl">
              <Sparkles className="size-4" />
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="bg-foreground/[0.05] size-9 rounded-xl" />
            ))}
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-foreground/[0.1] h-6 w-1/2 rounded-lg" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-foreground/[0.04] h-16 rounded-xl border border-white/[0.05]"
                />
              ))}
            </div>
            <div className="space-y-2.5 pt-1">
              <div className="bg-foreground/[0.06] h-2.5 w-full rounded" />
              <div className="bg-foreground/[0.06] h-2.5 w-5/6 rounded" />
              <div className="bg-foreground/[0.06] h-2.5 w-2/3 rounded" />
            </div>
            <div className="flex gap-2.5 pt-1">
              <div className="bg-primary/80 h-8 w-24 rounded-full" />
              <div className="bg-foreground/[0.06] h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
}
