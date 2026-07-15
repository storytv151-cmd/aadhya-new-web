"use client";

import { useActionState, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { INQUIRY_SERVICES, PROJECT_BUDGETS, type ApiResult } from "@aadhya/types";
import { Button, Input, Label, Textarea } from "@aadhya/ui";
import { cn } from "@aadhya/utils";
import { submitContact } from "@/app/actions/contact";

const serviceLabels: Record<(typeof INQUIRY_SERVICES)[number], string> = {
  "app-development": "App Development",
  "game-development": "Game Development",
  "web-development": "Web Development",
  "ui-ux-design": "UI/UX Design",
  "cyber-security": "Cyber Security",
  "cloud-services": "Cloud Services",
  "digital-marketing": "Digital Marketing",
  other: "Something else",
};

const budgetLabels: Record<(typeof PROJECT_BUDGETS)[number], string> = {
  "under-5k": "Under $5k",
  "5k-15k": "$5k – $15k",
  "15k-50k": "$15k – $50k",
  "50k-plus": "$50k+",
  "not-sure": "Not sure yet",
};

const selectClass =
  "glass-surface flex h-12 w-full rounded-2xl px-4 text-sm transition-[box-shadow,border-color] focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

function getFieldError(state: ApiResult | null, field: string): string | undefined {
  if (state && state.ok === false) return state.fieldErrors?.[field]?.[0];
  return undefined;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  if (state?.ok === true) {
    return (
      <div className="border-border bg-card shadow-soft flex flex-col items-center rounded-2xl border p-10 text-center">
        <CheckCircle2 className="text-success size-12" />
        <h3 className="mt-4 text-xl font-semibold">Message sent!</h3>
        <p className="text-muted-foreground mt-2">
          Thanks for reaching out — we&rsquo;ll get back to you shortly.
        </p>
      </div>
    );
  }

  const generalError = state?.ok === false && !state.fieldErrors ? state.message : undefined;

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={getFieldError(state, "name")}>
          <Input
            id="name"
            name="name"
            required
            aria-invalid={Boolean(getFieldError(state, "name"))}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={getFieldError(state, "email")}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={Boolean(getFieldError(state, "email"))}
          />
        </Field>
        <Field label="Phone (optional)" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" />
        </Field>
        <Field label="Company (optional)" htmlFor="company">
          <Input id="company" name="company" />
        </Field>
        <Field label="Service" htmlFor="service">
          <select id="service" name="service" defaultValue="" className={cn(selectClass)}>
            <option value="">Select a service</option>
            {INQUIRY_SERVICES.map((service) => (
              <option key={service} value={service}>
                {serviceLabels[service]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget" htmlFor="budget">
          <select id="budget" name="budget" defaultValue="" className={cn(selectClass)}>
            <option value="">Select a range</option>
            {PROJECT_BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budgetLabels[budget]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={getFieldError(state, "message")}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project…"
          aria-invalid={Boolean(getFieldError(state, "message"))}
        />
      </Field>

      {generalError && (
        <p role="alert" className="text-destructive text-sm">
          {generalError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" variant="gradient" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-muted-foreground text-xs">
          Protected against spam. We respect your privacy.
        </p>
      </div>
    </form>
  );
}
