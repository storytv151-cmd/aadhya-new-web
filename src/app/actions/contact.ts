"use server";

import { contactFormSchema, type ApiResult, type ContactFormResponse, ERROR_CODES } from "@/types";
import { isRateLimited } from "@/lib/rate-limit";
import { isMailConfigured, sendMail } from "@/lib/mailer";

/**
 * Contact / lead capture. Validates against the shared contract and rejects honeypot
 * hits. Delivers the lead by email (see lib/mailer). The return contract is unchanged.
 */
export async function submitContact(
  _prevState: ApiResult<ContactFormResponse> | null,
  formData: FormData,
): Promise<ApiResult<ContactFormResponse>> {
  if (await isRateLimited("contact", { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return {
      ok: false,
      error: ERROR_CODES.RATE_LIMITED,
      message: "Too many messages in a short time. Please try again in a few minutes.",
    };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    service: formData.get("service") || undefined,
    budget: formData.get("budget") || undefined,
    message: formData.get("message"),
    company_website: formData.get("company_website") ?? "",
    turnstileToken: formData.get("turnstileToken") ?? undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: ERROR_CODES.VALIDATION,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot: a filled hidden field means a bot.
  if (parsed.data.company_website) {
    return { ok: false, error: ERROR_CODES.SPAM_REJECTED, message: "Submission rejected." };
  }

  if (!isMailConfigured()) {
    console.error("[contact] SMTP is not configured; lead not delivered");
    return { ok: false, error: ERROR_CODES.SERVER_ERROR, message: "Email is temporarily unavailable. Please write to us directly." };
  }
  const d = parsed.data;
  try {
    await sendMail({
      subject: `Website enquiry from ${d.name}${d.company ? ` (${d.company})` : ""}`,
      replyTo: d.email,
      rows: [
        ["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["Company", d.company],
        ["Service", d.service], ["Budget", d.budget], ["Message", d.message],
      ],
    });
  } catch (err) {
    console.error("[contact] send failed:", err instanceof Error ? err.message : err);
    return { ok: false, error: ERROR_CODES.SERVER_ERROR, message: "We couldn't send your message right now. Please try again shortly." };
  }
  return { ok: true, data: {} };
}
