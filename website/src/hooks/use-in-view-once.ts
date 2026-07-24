"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-based reveal gate that fires once. Prefer native CSS
 * scroll-driven animations where possible; use this for JS-orchestrated reveals.
 */
export function useInViewOnce<T extends Element = Element>(
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
): readonly [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView] as const;
}
