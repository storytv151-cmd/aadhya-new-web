import { z } from "zod";

/**
 * Contact / lead capture contract. Shared by the website Server Action (client +
 * server validation) and — later — the Fastify service, so there is one source of truth.
 */

export const PROJECT_BUDGETS = ["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"] as const;

export const INQUIRY_SERVICES = [
  "app-development",
  "game-development",
  "web-development",
  "ui-ux-design",
  "cyber-security",
  "cloud-services",
  "digital-marketing",
  "other",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.enum(INQUIRY_SERVICES).optional(),
  budget: z.enum(PROJECT_BUDGETS).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details (min 10 characters)")
    .max(5000, "Message is too long"),
  /** Anti-spam: must stay empty. Bots tend to fill every field. */
  company_website: z.string().max(0).optional().or(z.literal("")),
  /** Cloudflare Turnstile token, verified server-side. */
  turnstileToken: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFormResponse = {
  /** Reference id of the created lead, useful for support follow-up. */
  reference?: string;
};
