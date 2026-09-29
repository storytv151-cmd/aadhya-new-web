"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils";
import { Container, Magnetic } from "@/ui";

const WORDS: { text: string; italic?: boolean }[] = [{ text: "Let's build " }, { text: "it.", italic: true }];

/** Closing call to action: huge letters that hop toward the pointer, and a spinning badge. */
export function BigCta({ kicker = "Got an idea?" }: { kicker?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const chars = gsap.utils.toArray<HTMLElement>("[data-ch]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(chars, {
          yPercent: 90,
          rotate: 8,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.035,
          scrollTrigger: { trigger: "[data-big]", start: "top 82%" },
        });
      });
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const big = el.querySelector<HTMLElement>("[data-big]");
        const arrow = el.querySelector<HTMLElement>("[data-arrow]");
        const hop = (e: PointerEvent) =>
          chars.forEach((ch) => {
            const r = ch.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const f = Math.max(0, 1 - Math.hypot(dx, e.clientY - (r.top + r.height / 2)) / 280);
            gsap.to(ch, { y: -f * 46, rotate: dx * 0.03 * f, duration: 0.5, ease: "power3.out" });
          });
        const settle = () => gsap.to(chars, { y: 0, rotate: 0, duration: 1.2, ease: "elastic.out(1,.3)" });
        const aim = (e: PointerEvent) => {
          if (!arrow) return;
          const r = arrow.getBoundingClientRect();
          const angle = (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
          gsap.to(arrow, { rotation: angle, duration: 0.6, ease: "power3.out" });
        };
        big?.addEventListener("pointermove", hop);
        big?.addEventListener("pointerleave", settle);
        window.addEventListener("pointermove", aim, { passive: true });
        return () => {
          big?.removeEventListener("pointermove", hop);
          big?.removeEventListener("pointerleave", settle);
          window.removeEventListener("pointermove", aim);
        };
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="cta" className="overflow-hidden py-[clamp(90px,11vw,160px)]">
      <Container>
        <span className="aur-kicker mb-5">{kicker}</span>
        <h2 data-big="" aria-label="Let's build it." className="text-[clamp(66px,14.5vw,236px)] font-bold leading-[.86] tracking-[-0.065em]">
          {WORDS.map((word) =>
            // Letters hop one by one, but each word stays unbroken when the line wraps.
            word.text
              .trim()
              .split(" ")
              .map((w, wi, all) => (
                <span key={`${word.text}-${wi}`} className="inline-block whitespace-nowrap">
                  {w.split("").map((ch, i) => (
                    <span
                      key={i}
                      data-ch=""
                      aria-hidden="true"
                      className={cn("inline-block will-change-transform", word.italic && "aur-em text-primary-text")}
                    >
                      {ch}
                    </span>
                  ))}
                  {(wi < all.length - 1 || word.text.endsWith(" ")) && <span className="inline-block w-[.22em]" />}
                </span>
              )),
          )}
        </h2>
        <div className="mt-[clamp(30px,4vw,54px)] flex flex-wrap items-center justify-between gap-7">
          <div className="max-w-md">
            <p className="text-muted-foreground text-[clamp(16px,1.3vw,19px)]">
              Tell us what you have in mind — we&rsquo;ll get back to you fast with next steps and a rough plan.
            </p>
            <Link href="/portfolio" className="text-foreground mt-4 inline-block font-semibold underline decoration-1 underline-offset-4">
              Or see our work first
            </Link>
          </div>
          <Magnetic strength={0.3}>
            <Link
              href="/contact"
              data-cursor="Let's talk"
              aria-label="Start a project — contact us"
              className="bg-primary text-primary-foreground relative grid aspect-square w-[clamp(140px,13vw,180px)] place-items-center rounded-full"
            >
              <svg aria-hidden="true" viewBox="0 0 100 100" className="aur-ring absolute inset-2">
                <defs>
                  <path id="aur-ring-path" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                </defs>
                <text className="fill-current font-mono text-[10.2px] uppercase tracking-[.24em]">
                  <textPath href="#aur-ring-path">Start a project • Start a project • </textPath>
                </text>
              </svg>
              <svg data-arrow="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-[30%]">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </Link>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
