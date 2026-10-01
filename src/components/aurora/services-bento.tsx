"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/utils";
import { services } from "@/content/site-content";
import { serviceVisuals } from "@/content/visuals";
import { getIcon } from "@/components/sections/icon-map";
import { Container } from "@/ui";
import { SectionTitle } from "./section-title";

// Cards 1, 4 and 6 span two columns; together the six fill a 3×3 grid.
const WIDE = new Set([0, 3, 5]);

/** Service cards that lean toward the pointer, with a glow and border that follow it. */
export function ServicesBento({
  kicker = "(03) What we do",
  detail = false,
}: {
  kicker?: string;
  /** On /services each card is an anchor target (#app-development…) instead of a link. */
  detail?: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-card]", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-bento]", start: "top 82%" },
        });
      });
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        const offs = cards.map((card) => {
          gsap.set(card, { transformPerspective: 900 });
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty("--mx", `${px * 100}%`);
            card.style.setProperty("--my", `${py * 100}%`);
            gsap.to(card, { rotationY: (px - 0.5) * 10, rotationX: (0.5 - py) * 8, duration: 0.5, ease: "power3.out" });
          };
          const leave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 1, ease: "elastic.out(1,.4)" });
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        });
        return () => offs.forEach((off) => off());
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={detail ? undefined : "services"} className="py-[clamp(90px,12vw,170px)]">
      <Container>
        <SectionTitle
          kicker={kicker}
          title="Everything to design, build and *scale.*"
          aside={<p className="text-muted-foreground max-w-xs">Move over a card — it leans toward you.</p>}
        />
        <div data-bento="" className="grid auto-rows-[minmax(270px,auto)] gap-3.5 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const visual = serviceVisuals[service.slug];
            const wide = WIDE.has(i);
            const className = cn(
              "aur-bento-card group bg-card border-border flex flex-col justify-end overflow-hidden rounded-[26px] border p-6 pt-[84px] lg:pt-6",
              wide && "lg:col-span-2",
            );
            const body = (
              <>
                <span className="bg-primary/15 text-primary-text absolute left-6 top-[22px] grid size-[46px] place-items-center rounded-[14px]">
                  <Icon aria-hidden="true" className="size-[22px]" />
                </span>
                {visual && (
                  <span
                    className={cn(
                      "relative mb-4 block h-[180px] overflow-hidden rounded-[18px] lg:absolute lg:bottom-5 lg:right-5 lg:top-5 lg:mb-0 lg:h-auto",
                      wide ? "lg:w-[42%]" : "lg:w-[46%]",
                    )}
                  >
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                )}
                <h3 className="mb-2 text-[clamp(24px,2.4vw,34px)] font-bold leading-[1.05] tracking-[-0.035em]">{service.title}</h3>
                <p className={cn("text-muted-foreground text-[15px]", visual ? "lg:max-w-[50%]" : "max-w-[360px]")}>
                  {service.description}
                </p>
                <div className={cn("mt-4 flex flex-wrap gap-1.5", visual && "lg:max-w-[50%]")}>
                  {service.features.map((f) => (
                    <span key={f} className="aur-chip">
                      {f}
                    </span>
                  ))}
                </div>
              </>
            );
            return detail ? (
              <article key={service.slug} id={service.slug} data-card="" className={className}>
                {body}
              </article>
            ) : (
              <Link key={service.slug} href={`/services#${service.slug}`} data-card="" data-cursor="Explore" className={className}>
                {body}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
