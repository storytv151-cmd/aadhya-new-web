"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button, Glass, Reveal } from "@/ui";
import { cn, formatNumber } from "@/utils";
import { goCartLinks, goCartPlans, yearlyPrice } from "@/content/gocart";

type Period = "monthly" | "yearly";

const periods: { id: Period; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

/** ₹1,499 — Indian digit grouping, whole rupees. */
const formatInr = (amount: number) =>
  formatNumber(
    amount,
    { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 0 },
    "en-IN",
  );

/** Billing-period toggle + the two plan cards. Server-rendered on "monthly". */
export function GoCartPricingPlans() {
  const [period, setPeriod] = useState<Period>("monthly");
  const yearly = period === "yearly";

  return (
    <>
      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="glass-surface inline-flex items-center gap-1 rounded-full p-1"
          >
            {periods.map((option) => {
              const active = period === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPeriod(option.id)}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-300 sm:px-5",
                    active
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {option.label}
                  {option.id === "yearly" && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        active ? "bg-white/20 text-white" : "bg-primary/12 text-primary",
                      )}
                    >
                      2 months free
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* Announce the switch to screen-reader users (the buttons only report pressed state). */}
        <p aria-live="polite" className="sr-only">
          {yearly ? "Showing yearly prices." : "Showing monthly prices."}
        </p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        {goCartPlans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className="h-full">
            <Glass
              specular
              interactive
              strength={plan.featured ? "floating" : "default"}
              className={cn(
                "flex h-full flex-col rounded-[2rem] p-6 sm:p-8",
                plan.featured && "ring-primary/40 ring-1",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
                {plan.badge && (
                  <span className="bg-primary text-primary-foreground shadow-glow rounded-full px-3 py-1 text-xs font-semibold">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-2 text-sm">{plan.tagline}</p>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {formatInr(yearly ? yearlyPrice(plan) : plan.monthly)}
                </span>
                <span className="text-muted-foreground text-sm">/ {yearly ? "year" : "month"}</span>
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm">
                {yearly ? "Billed yearly — 2 months free" : "Billed monthly"}
              </p>

              <Button
                asChild
                className="mt-7 w-full"
                variant={plan.featured ? "default" : "glass"}
              >
                <a href={goCartLinks.register}>
                  Start free trial<span className="sr-only"> on the {plan.name} plan</span>
                </a>
              </Button>

              {plan.includes && <p className="mt-8 text-sm font-medium">{plan.includes}</p>}
              <ul className={cn("space-y-3", plan.includes ? "mt-4" : "mt-8")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check aria-hidden="true" className="text-primary mt-0.5 size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Glass>
          </Reveal>
        ))}
      </div>
    </>
  );
}
