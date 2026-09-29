"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils";
import { getLenis } from "@/ui/providers/lenis-provider";
import { marqueeRows } from "@/content/visuals";

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[.46em] flex-none">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}

/** Two rows of big words that drift, speed up with the scroll and lean into it. */
export function MarqueeBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>("[data-track]");
      const state = tracks.map((t) => ({ el: t, x: 0, dir: Number(t.dataset.track) }));
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let lastY = scrollY;
      let skew = 0;
      let heading = 1;
      const tick = () => {
        // Lenis gives a smoothed velocity; on touch (native scroll) use the frame delta.
        const lenis = getLenis();
        const v = lenis ? lenis.velocity : scrollY - lastY;
        lastY = scrollY;
        if (v) heading = Math.sign(v);
        skew += (gsap.utils.clamp(-10, 10, -v * 0.35) - skew) * 0.12;
        for (const s of state) {
          const w = s.el.scrollWidth / 3;
          s.x -= s.dir * heading * (reduce ? 0 : 1.1 + Math.min(Math.abs(v), 60) * 0.35);
          if (s.x <= -w) s.x += w;
          if (s.x > 0) s.x -= w;
          s.el.style.transform = `translate3d(${s.x}px,0,0) skewX(${reduce ? 0 : skew}deg)`;
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-hidden="true" className="border-border overflow-hidden border-y py-[clamp(36px,6vw,80px)]">
      {marqueeRows.map((row, r) => (
        <div
          key={r}
          className={cn(
            "whitespace-nowrap text-[clamp(50px,9vw,140px)] font-bold leading-[1.04] tracking-[-0.045em]",
            r === 1 && "text-transparent [-webkit-text-stroke:1.5px_var(--foreground)]",
          )}
        >
          <div data-track={r === 0 ? 1 : -1} className="inline-flex items-center will-change-transform">
            {[0, 1, 2].map((copy) =>
              row.map((word) => (
                <span key={`${copy}-${word}`} className="inline-flex items-center">
                  <span className="px-[.22em]">{word}</span>
                  <span className={r === 0 ? "text-primary" : "text-accent-lime"}>
                    <Star />
                  </span>
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
