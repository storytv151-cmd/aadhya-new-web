"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A dot plus a trailing ring that grows over links and shows a label over anything with
 * `data-cursor="…"`. Fine pointers only; text fields keep the normal caret.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const show = (on: boolean) => {
      dot.classList.toggle("is-on", on);
      ring.classList.toggle("is-on", on);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      const typing = !!el?.closest("input, textarea, select, [contenteditable='true']");
      show(!typing);
      const target = el?.closest<HTMLElement>("[data-cursor], a, button, [role='button'], summary, label");
      const text = target?.dataset.cursor;
      ring.classList.toggle("is-label", !!text);
      ring.classList.toggle("is-hover", !!target && !text);
      if (text) label.textContent = text;
    };
    const leave = () => show(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="aur-cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="aur-cursor-ring">
        <span ref={labelRef} />
      </div>
    </>
  );
}
