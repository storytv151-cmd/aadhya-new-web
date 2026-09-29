"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markIntroDone } from "./intro";
import { UPPER, scramble } from "./scramble";

const SEEN_KEY = "aadhya-intro";

// Runs while the HTML is parsed: a repeat visit in this tab (or reduced motion) hides the
// intro before the first paint. It only touches <html>, which already tolerates attribute
// differences at hydration.
const skipScript = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-seen')}catch(e){}`;

/** Home-page intro: a 0→100 counter, then a two-colour curtain lifts off the hero. */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    if (root.classList.contains("intro-seen") || getComputedStyle(el).display === "none") {
      markIntroDone();
      return;
    }
    const num = el.querySelector<HTMLElement>("[data-num]");
    const bar = el.querySelector<HTMLElement>("[data-bar]");
    const word = el.querySelector<HTMLElement>("[data-word]");
    if (word) scramble(word, word.dataset.word ?? "", 1000, UPPER + UPPER.toLowerCase());
    // The CSS fallback fade isn't needed once JS drives the exit.
    el.style.animation = "none";
    const counter = { v: 0 };
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Storage blocked (private mode): the intro simply plays again next time.
      }
      root.classList.add("intro-seen");
    };
    const tl = gsap
      .timeline({ onComplete: finish })
      .to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (num) num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          if (bar) bar.style.width = `${counter.v}%`;
        },
      })
      .to(el.querySelector("[data-inner]"), { yPercent: -10, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=.05")
      .to(el.querySelector(".l1"), { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=.15")
      .to(el.querySelector(".l2"), { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=.88")
      .add(markIntroDone, "-=.8");
    const skip = () => tl.timeScale(4);
    el.addEventListener("click", skip);
    return () => {
      el.removeEventListener("click", skip);
      tl.kill();
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <div ref={ref} data-aur-intro="" aria-hidden="true" className="aur-intro">
        <div className="l2" />
        <div className="l1" />
        <div data-inner="" className="relative mx-auto flex h-full w-[min(1240px,100%-32px)] flex-col justify-between pb-9 pt-7">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em]">
            <span className="flex items-center gap-2.5 font-sans text-base font-bold normal-case tracking-tight">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative mark, shown for 2 seconds */}
              <img src="/brand/icon.png" alt="" width={28} height={28} className="size-7 rounded-md bg-white p-0.5" />
              <span data-word="Aadhya Infotech">Aadhya Infotech</span>
            </span>
            <span className="hidden sm:inline">Apps · Games · Web · Cloud</span>
          </div>
          <div>
            <div data-num="" className="text-[clamp(120px,27vw,400px)] font-bold leading-[0.78] tracking-[-0.06em] tabular-nums">
              000
            </div>
            <div className="mt-5 h-0.5 bg-white/25">
              <i data-bar="" className="block h-full w-0 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
