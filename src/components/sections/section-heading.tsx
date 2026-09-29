import type { ReactNode } from "react";
import { Eyebrow, Reveal } from "@/ui";
import { cn } from "@/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="none">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-balance text-[clamp(2.1rem,4.6vw,4rem)] font-bold leading-[1.02] tracking-[-0.045em]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-muted-foreground mt-4 text-pretty text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
