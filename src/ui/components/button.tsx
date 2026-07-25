"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";

// Shared light-sweep sheen for the shiny variants.
const sweep =
  "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[150%] before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-[900ms] before:ease-out hover:before:translate-x-[240%]";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium outline-none transition-[transform,background-color,box-shadow,color,filter] duration-300 ease-spring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: cn(
          "border border-white/15 bg-primary text-primary-foreground shadow-glow hover:brightness-110",
          sweep,
        ),
        gradient: cn(
          "bg-gradient-to-r from-brand-from via-brand-via to-brand-to text-white shadow-glow hover:brightness-110",
          sweep,
        ),
        glass: "glass glass-interactive text-foreground",
        outline: "glass-surface glass-interactive text-foreground",
        ghost: "text-foreground hover:bg-foreground/[0.06]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = "Button";
