import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@aadhya/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "glass-surface flex h-12 w-full rounded-2xl px-4 py-2 text-sm transition-[box-shadow,border-color]",
          "placeholder:text-muted-foreground",
          "focus-visible:border-primary/60 focus-visible:ring-primary/30 focus-visible:outline-none focus-visible:ring-2",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
