import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "glass-surface flex min-h-28 w-full rounded-2xl px-4 py-3 text-sm transition-[box-shadow,border-color]",
        "placeholder:text-muted-foreground",
        "focus-visible:border-primary/60 focus-visible:ring-primary/30 focus-visible:outline-none focus-visible:ring-2",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
