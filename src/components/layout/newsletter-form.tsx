"use client";

import { useActionState } from "react";
import { Button, Input } from "@/ui";
import { cn } from "@/utils";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, null);
  const success = state?.ok === true;
  const error = state?.ok === false ? state : null;

  return (
    <form action={formAction} className={cn("space-y-2", className)}>
      <label htmlFor="newsletter-email" className="text-sm font-semibold">
        Stay in the loop
      </label>
      <p className="text-muted-foreground text-sm">
        Product updates and engineering notes. No spam, unsubscribe anytime.
      </p>

      {/* Honeypot — hidden from users, tempting to bots. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <input type="hidden" name="source" value="footer" />

      <div className="flex gap-2 pt-1">
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          aria-invalid={Boolean(error)}
          disabled={pending || success}
        />
        <Button type="submit" disabled={pending || success}>
          {success ? "Subscribed" : pending ? "…" : "Subscribe"}
        </Button>
      </div>

      {success && (
        <p role="status" className="text-success text-sm">
          Thanks — you&rsquo;re on the list!
        </p>
      )}
      {error && (
        <p role="alert" className="text-destructive text-sm">
          {error.message}
        </p>
      )}
    </form>
  );
}
