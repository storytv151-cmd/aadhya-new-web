"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/ui";

export type Fact = { value: number; suffix?: string; label: string };

const STATEMENT = [
  { text: "Aadhya Infotech designs, builds and ships software for businesses — apps, games, websites and cloud platforms — and runs products of its own, like" },
  { text: "Go Cart", em: true },
  { text: "and" },
  { text: "DevStore.", em: true },
];

/** The studio in one sentence (words light up as you read) plus a few counted facts. */
export function StudioStatement({ facts }: { facts: Fact[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-sw]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
        // Odometer: each digit column spins twice through 0–9 and lands on its digit.
        gsap.utils.toArray<HTMLElement>("[data-odo]").forEach((col, i) => {
          const digit = Number(col.dataset.odo);
          gsap.fromTo(
            col.firstElementChild,
            { yPercent: 0, y: 0 },
            {
              yPercent: -((10 + digit) / 20) * 100,
              y: 0,
              duration: 2.2,
              ease: "power4.out",
              delay: i * 0.08,
              scrollTrigger: { trigger: "[data-facts]", start: "top 82%" },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-[clamp(90px,13vw,190px)]">
      <Container>
        <span className="aur-kicker mb-5">(01) The studio</span>
        <p data-statement="" className="max-w-[1120px] text-[clamp(28px,4.1vw,62px)] font-bold leading-[1.12] tracking-[-0.035em]">
          {STATEMENT.map((part, i) =>
            part.em ? (
              <span key={i}>
                {" "}
                <span data-sw="" className="aur-em text-primary-text">
                  {part.text}
                </span>
              </span>
            ) : (
              part.text.split(" ").map((w, j) => (
                <span key={`${i}-${j}`}>
                  {(i > 0 || j > 0) && " "}
                  <span data-sw="">{w}</span>
                </span>
              ))
            ),
          )}
        </p>
        <dl data-facts="" className="border-border mt-[clamp(60px,8vw,110px)] grid grid-cols-3 gap-4 border-t pt-7">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="sr-only">
                  {fact.value}
                  {fact.suffix}
                </span>
                <span aria-hidden="true" className="flex items-start text-[clamp(52px,8.4vw,128px)] font-bold leading-none tracking-[-0.05em]">
                  {String(fact.value)
                    .split("")
                    .map((d, i) => (
                      // One column per digit, sized to that digit so "12" has no gap after the 1.
                      <span key={i} className="relative inline-block h-[1em] overflow-hidden">
                        <span className="invisible">{d}</span>
                        <span data-odo={d} className="absolute inset-x-0 top-0">
                          {/* Rests on the final digit, so it reads right without JS or motion. */}
                          <span className="flex flex-col" style={{ transform: `translateY(-${((10 + Number(d)) / 20) * 100}%)` }}>
                            {Array.from({ length: 20 }, (_, k) => (
                              <span key={k} className="h-[1em] text-center leading-none">
                                {k % 10}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    ))}
                  {fact.suffix && <sup className="text-primary-text ml-[.04em] text-[.45em] leading-[1.2]">{fact.suffix}</sup>}
                </span>
              </dd>
              <p aria-hidden="true" className="text-muted-foreground mt-2.5 text-[clamp(13px,1.1vw,15px)]">
                {fact.label}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
