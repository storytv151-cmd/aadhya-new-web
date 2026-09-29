"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/ui";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // The new theme grows out of the button as a circle (View Transitions API); browsers
  // without it, and reduced-motion users, just switch.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(next);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc
      .startViewTransition(() => {
        // next-themes applies its class in an effect, which would land after the snapshot,
        // so the class is set here directly as well.
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(next);
        root.style.colorScheme = next;
        flushSync(() => setTheme(next));
      })
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 800, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11 lg:size-9"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={toggle}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" />
        ) : (
          <Moon className="size-[18px]" />
        )
      ) : (
        <span className="size-[18px]" />
      )}
    </Button>
  );
}
