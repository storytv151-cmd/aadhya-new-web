"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "@/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

export const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[1300] bg-slate-950/50 backdrop-blur-sm",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "glass-floating fixed z-[1310] gap-4 transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-400",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface SheetContentProps
  extends
    ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <SheetPrimitive.Close className="text-muted-foreground focus-visible:ring-ring absolute right-5 top-5 rounded-full p-1 opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-6", className)} {...props} />;
}

export const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-foreground text-base font-semibold", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";
