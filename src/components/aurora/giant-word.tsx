"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** The brand name set huge at the foot of the page; letters rise as it scrolls in. */
export function GiantWord({ word = "AADHYA" }: { word?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("span", {
          yPercent: 100,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 98%", end: "bottom bottom", scrub: 1 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="aur-giant overflow-hidden whitespace-nowrap pt-[.04em] text-center text-[21vw] font-bold leading-[.76] tracking-[-0.075em]"
    >
      {word.split("").map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  );
}

/** Local time at the studio, e.g. "14:32". */
export function StudioClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return <b className="text-foreground font-semibold tabular-nums">{time || "--:--"}</b>;
}
