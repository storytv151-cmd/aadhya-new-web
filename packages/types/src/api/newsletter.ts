import { z } from "zod";

/** Newsletter subscription contract (footer signup). */
export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(200),
  /** Optional context so we know where the signup came from. */
  source: z.string().max(80).optional(),
  /** Anti-spam honeypot: must stay empty. */
  company_website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
