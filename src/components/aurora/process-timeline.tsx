"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils";
import { processSteps } from "@/content/site-content";
import { Container } from "@/ui";
import { SectionTitle } from "./section-title";

/** A line draws down the page as you scroll; each step lights up when the line reaches it. */
export function ProcessTimeline({ kicker = "(05) How we work" }: { kicker?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-line]", start: "top 60%", end: "bottom 60%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            onEnter: () => step.classList.add("is-on"),
            onLeaveBack: () => step.classList.remove("is-on"),
          });
          gsap.from(step.querySelector(".aur-tl-card"), {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%" },
          });
        });
      });
      // Without motion every step is simply lit.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => step.classList.add("is-on"));
        gsap.set("[data-fill]", { scaleY: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="py-[clamp(90px,12vw,170px)]">
      <Container>
        <SectionTitle kicker={kicker} title="From first call to *launch day.*" />
        <ol data-line="" className="relative py-2.5">
          <span aria-hidden="true" className="bg-border absolute bottom-0 left-3.5 top-0 w-0.5 lg:left-1/2 lg:-ml-px">
            <i
              data-fill=""
              className="from-brand-from via-brand-to to-accent-lime absolute inset-0 origin-top bg-gradient-to-b"
              style={{ transform: "scaleY(0)" }}
            />
          </span>
          {processSteps.map((step, i) => (
            <li
              key={step.step}
              data-step=""
              className={cn("aur-tl-step relative flex justify-end py-9", i % 2 === 0 && "lg:justify-start")}
            >
              <span
                aria-hidden="true"
                className="aur-tl-dot bg-background border-border absolute left-3.5 top-[66px] -ml-[9px] size-[18px] rounded-full border-2 transition-all duration-500 lg:left-1/2"
              />
              <div className="aur-tl-card bg-card border-border w-[calc(100%-44px)] rounded-3xl border p-7 transition-[border-color,box-shadow] duration-700 lg:w-[calc(50%-60px)]">
                <span className="text-primary-text font-mono text-[13px]">0{step.step}</span>
                <h3 className="my-2.5 text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.05] tracking-[-0.035em]">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
