import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@aadhya/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        outline: "border-border text-foreground",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/15 text-warning",
        gradient:
          "border-transparent bg-gradient-to-r from-brand-from/15 via-brand-via/15 to-brand-to/15 text-brand-via",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
