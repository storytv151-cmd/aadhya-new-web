"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { heroContent } from "@/content/site-content";
import { heroWall } from "@/content/visuals";
import { AuroraButton } from "./aurora-button";
import { Photo } from "./photo";
import { scramble } from "./scramble";

const COLUMNS = 5;

/** Hero: a tilted, endlessly scrolling wall of photos under an aurora glow. */
export function HeroWall() {
  const root = useRef<HTMLElement>(null);
  const { aurora, announcement } = heroContent;
  const perColumn = Math.ceil(heroWall.length / COLUMNS);
  const columns = Array.from({ length: COLUMNS }, (_, c) => heroWall.slice(c * perColumn, (c + 1) * perColumn));

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: the headline rises, the rest fades up, the wall settles in.
        gsap
          .timeline()
          .from(".aur-w, .aur-rot", { yPercent: 115, duration: 1.15, ease: "power4.out", stagger: 0.07 })
          .from("[data-in]", { y: 26, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }, 0.35)
          .from(".aur-wall", { opacity: 0, scale: 1.12, duration: 2, ease: "power2.out" }, 0);

        // Drift away while scrolling past.
        gsap.to(".aur-hero-in", {
          yPercent: -14,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".aur-wall", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        // The rotating word: the box eases to the next word's width while letters scramble.
        const word = el.querySelector<HTMLElement>(".aur-rot");
        let timer: ReturnType<typeof setInterval> | undefined;
        if (word) {
          const measure = (text: string) => {
            const probe = word.cloneNode() as HTMLElement;
            probe.textContent = text;
            probe.style.cssText = "position:absolute;visibility:hidden;width:auto";
            word.parentElement?.append(probe);
            const width = probe.getBoundingClientRect().width;
            probe.remove();
            return width;
          };
          gsap.set(word, { width: measure(word.textContent ?? "") });
          let index = 0;
          timer = setInterval(() => {
            if (document.hidden) return;
            index = (index + 1) % aurora.words.length;
            const next = aurora.words[index] ?? "";
            const width = measure(next);
            const grow = width > word.getBoundingClientRect().width;
            gsap.to(word, { width, duration: grow ? 0.45 : 0.5, delay: grow ? 0 : 0.35, ease: "power2.out" });
            scramble(word, next, 650);
          }, 2800);
        }
        return () => {
          if (timer) clearInterval(timer);
        };
      });

      // The wall leans toward the mouse.
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const tilt = el.querySelector(".aur-wall-tilt");
        if (!tilt) return;
        gsap.set(tilt, { transformPerspective: 1400 });
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3" });
        const move = (e: PointerEvent) => {
          ry((e.clientX / innerWidth - 0.5) * 8);
          rx((e.clientY / innerHeight - 0.5) * -6);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32"
    >
      <div aria-hidden="true" className="aur-wall">
        <div className="aur-wall-tilt">
          <div className="aur-wall-in">
            {columns.map((items, c) => (
              <div key={c} className="aur-wcol">
                {[...items, ...items].map((item, i) => (
                  <figure key={`${c}-${i}`}>
                    <Photo src={item.src} alt="" fill sizes="(min-width: 1024px) 300px, 180px" className="object-cover" />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="aur-aurora">
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden="true" className="aur-wall-fade" />

      <div className="aur-hero-in relative z-[2] mx-auto flex w-[min(1100px,100%-32px)] flex-col items-center gap-6 text-center">
        <div data-in="" className="flex flex-wrap justify-center gap-2">
          <span className="aur-pill">
            <span className="aur-dot" />
            Taking new projects
          </span>
          <Link href={announcement.href} className="aur-pill">
            <span className="aur-tag">{announcement.badge}</span>
            Go Cart for Shopify →
          </Link>
        </div>
        <h1 className="aur-h1" aria-label={`${aurora.lead} ${aurora.words[0]}`}>
          {aurora.lines.map((line, i) => (
            <span key={line} className="aur-line">
              {line.split(" ").map((w, j) => (
                <span key={j}>
                  {j > 0 && " "}
                  <span className="aur-w">{w}</span>
                </span>
              ))}
              {i === aurora.lines.length - 1 && (
                <>
                  {" "}
                  <span className="aur-rot aur-grad">{aurora.words[0]}</span>
                </>
              )}
            </span>
          ))}
        </h1>
        <p data-in="" className="text-muted-foreground max-w-[470px] text-pretty text-[clamp(16px,1.3vw,19px)]">
          {heroContent.subhead}
        </p>
        <div data-in="" className="flex flex-wrap justify-center gap-2.5">
          <AuroraButton href={heroContent.primaryCta.href} cursor="Let's go" arrow>
            {heroContent.primaryCta.label}
          </AuroraButton>
          <AuroraButton href={heroContent.secondaryCta.href} variant="ghost">
            {heroContent.secondaryCta.label}
          </AuroraButton>
        </div>
      </div>
      <div
        data-in=""
        className="text-muted-foreground border-border absolute inset-x-0 bottom-6 z-[2] mx-auto flex w-[min(1240px,100%-32px)] justify-between border-t pt-4 font-mono text-[11.5px] uppercase tracking-[0.08em] md:w-[min(1240px,100%-80px)]"
      >
        <span>Scroll</span>
        <span>Surat, India</span>
      </div>
    </section>
  );
}
