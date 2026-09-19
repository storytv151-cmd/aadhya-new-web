import { BellRing, House, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { Glass } from "@/ui";
import { cn } from "@/utils";

// Full class strings so Tailwind picks up each gradient (no dynamic concatenation).
// All on the blue/indigo/cyan brand ramp — no off-system palette colours.
const tileGradients = [
  "from-brand-from/25 to-brand-to/20",
  "from-accent-indigo/25 to-accent-cyan/15",
  "from-primary/25 to-brand-to/15",
  "from-brand-via/25 to-accent-cyan/15",
];

const tabs = [House, LayoutGrid, ShoppingCart, User];

/**
 * A merchant's store running inside the Go Cart app shell — abstract shapes only.
 * Shared by the home "Our products" section and the /GoCart landing page.
 */
export function GoCartMockup({ className }: { className?: string }) {
  return (
    // Purely decorative illustration — hidden from AT.
    <div aria-hidden="true" className={cn("relative mx-auto w-full max-w-[18rem]", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_66%)] opacity-[0.1] blur-3xl"
      />

      {/* push notification */}
      <div className="glass-floating absolute -right-3 top-16 z-20 flex w-48 items-center gap-2.5 rounded-2xl p-2.5 sm:-right-10">
        <span className="bg-primary/15 text-primary flex size-8 shrink-0 items-center justify-center rounded-xl">
          <BellRing className="size-4" />
        </span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="bg-foreground/[0.14] h-2 w-3/4 rounded" />
          <span className="bg-foreground/[0.07] h-2 w-full rounded" />
        </span>
      </div>

      <Glass
        strength="showcase"
        specular
        refract
        interactive={false}
        className="overflow-hidden rounded-[2.25rem]"
      >
        {/* status bar */}
        <div className="flex justify-center pt-3">
          <span className="bg-foreground/15 h-1.5 w-16 rounded-full" />
        </div>

        {/* promo banner with coupon */}
        <div className="from-brand-from/25 to-brand-to/20 mx-4 mt-4 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r p-3">
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="bg-foreground/[0.16] h-2 w-2/3 rounded" />
            <span className="bg-foreground/[0.08] h-2 w-1/2 rounded" />
          </span>
          <span className="border-primary/50 h-6 w-14 shrink-0 rounded-lg border border-dashed" />
        </div>

        {/* store content */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {tileGradients.map((grad, i) => (
            <div key={i} className="glass-surface rounded-2xl p-2.5">
              <div className={cn("aspect-square rounded-xl bg-gradient-to-br", grad)} />
              <span className="bg-foreground/[0.12] mt-2.5 block h-2 w-3/4 rounded" />
              <span className="bg-foreground/[0.06] mt-1.5 block h-2 w-1/2 rounded" />
            </div>
          ))}
        </div>

        {/* bottom tab bar with live cart badge */}
        <div className="flex items-center justify-around border-t border-white/[0.06] px-4 pb-5 pt-3">
          {tabs.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "relative flex size-9 items-center justify-center rounded-xl",
                i === 0 ? "text-primary bg-primary/12" : "text-muted-foreground",
              )}
            >
              <Icon className="size-[18px]" />
              {i === 2 && (
                <span className="bg-primary text-primary-foreground absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
                  2
                </span>
              )}
            </span>
          ))}
        </div>
      </Glass>
    </div>
  );
}
