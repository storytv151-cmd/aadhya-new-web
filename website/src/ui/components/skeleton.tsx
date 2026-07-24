import { cn } from "@/utils";
import type { HTMLAttributes } from "react";

/**
 * Shimmering placeholder block for loading states. Uses the shared `skeleton`
 * utility (a muted base with a sweeping highlight); freezes to a static muted
 * block under `prefers-reduced-motion`.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton rounded-md", className)} {...props} />;
}
