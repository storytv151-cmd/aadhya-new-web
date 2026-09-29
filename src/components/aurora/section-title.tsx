"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils";

/** Splits "Build and *scale.*" into masked words; words in *…* use the serif italic. */
export function SplitWords({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .forEach((part, i) => {
      const italic = part.startsWith("*") && part.endsWith("*");
      const clean = italic ? part.slice(1, -1) : part;
      clean.split(/(\s+)/).forEach((token, j) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          out.push(" ");
          return;
        }
        out.push(
          <span key={`${i}-${j}`} className="aur-wm">
            <span className={cn("aur-wi", italic && "aur-em")}>{token}</span>
          </span>,
        );
      });
    });
  return <>{out}</>;
}

/** Numbered kicker + big heading whose words rise into view once it scrolls in. */
export function SectionTitle({
  kicker,
  title,
  description,
  aside,
  as: Tag = "h2",
  className,
}: {
  kicker?: string;
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".aur-wi", {
          yPercent: 115,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: "top 86%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-14", className)}>
      <div className="max-w-[900px]">
        {kicker && <span className="aur-kicker mb-5">{kicker}</span>}
        <Tag className="aur-h2">
          <SplitWords text={title} />
        </Tag>
        {description && <div className="text-muted-foreground mt-5 max-w-xl text-lg">{description}</div>}
      </div>
      {aside}
    </div>
  );
}
