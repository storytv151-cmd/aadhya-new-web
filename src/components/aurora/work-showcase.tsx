"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolioProjects } from "@/content/site-content";
import { Photo } from "./photo";
import { SectionTitle } from "./section-title";

/**
 * Selected work scrolls sideways while the section is pinned; each card swings through
 * a slight 3D turn as it crosses the screen and its photo drifts inside the frame.
 */
export function WorkShowcase({ kicker = "(04) Selected work" }: { kicker?: string }) {
  const root = useRef<HTMLElement>(null);
  const projects = portfolioProjects.filter((p) => p.image);

  useGSAP(
    () => {
      const pin = root.current?.querySelector<HTMLElement>("[data-pin]");
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!pin || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.scrollWidth - innerWidth);
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (s) => gsap.set("[data-progress]", { scaleX: s.progress }),
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-work]").forEach((card) => {
          gsap.set(card, { transformPerspective: 1100 });
          gsap.fromTo(
            card,
            { rotationY: -22 },
            { rotationY: 22, ease: "none", scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true } },
          );
          const img = card.querySelector("img");
          if (img)
            gsap.fromTo(
              img,
              { xPercent: -6 },
              { xPercent: 6, ease: "none", scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true } },
            );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work">
      {/* Reduced motion: the track simply scrolls sideways by touch/trackpad. */}
      <div data-pin="" className="flex min-h-[100svh] flex-col justify-center gap-[clamp(22px,4vh,46px)] overflow-hidden py-16 motion-reduce:overflow-x-auto">
        <div className="mx-auto flex w-[min(1240px,100%-32px)] items-end justify-between gap-5 md:w-[min(1240px,100%-80px)]">
          <SectionTitle kicker={kicker} title="Work we're *proud* of." className="mb-0 lg:mb-0" />
          <div className="bg-border mb-3.5 h-0.5 w-[min(240px,34vw)] flex-none">
            <i data-progress="" className="bg-foreground block h-full origin-left" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
        <div
          data-track=""
          className="flex w-max items-start gap-[clamp(14px,2vw,28px)] px-[max(16px,calc((100vw-1240px)/2))] will-change-transform md:px-[max(40px,calc((100vw-1240px)/2))]"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.href ?? "/portfolio"}
              data-work=""
              data-cursor="View"
              className="group w-[78vw] flex-none md:w-[clamp(280px,34vw,500px)]"
            >
              <div className="bg-card relative aspect-[4/3] overflow-hidden rounded-[22px]">
                {project.image && (
                  <Photo
                    src={project.image.url}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 768px) 34vw, 78vw"
                    className="!-left-[8%] !w-[116%] max-w-none object-cover transition-[scale] duration-1000 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-3.5 flex items-center justify-between gap-2.5">
                <b className="text-[clamp(18px,1.6vw,24px)] tracking-[-0.025em]">{project.title}</b>
                <span className="border-border text-muted-foreground whitespace-nowrap rounded-full border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em]">
                  {project.category.replace(" Development", "")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
