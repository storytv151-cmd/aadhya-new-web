"use server";

import { newsletterSchema, type ApiResult, ERROR_CODES } from "@/types";
import { isRateLimited } from "@/lib/rate-limit";
import { isMailConfigured, sendMail } from "@/lib/mailer";

/**
 * Newsletter subscription. Validates against the shared contract and rejects honeypot
 * hits. This is a frontend-only build with no data store — wire an email / ESP here to
 * store the subscriber. The return contract is unchanged.
 */
export async function subscribeToNewsletter(
  _prevState: ApiResult | null,
  formData: FormData,
): Promise<ApiResult> {
  if (await isRateLimited("newsletter", { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return {
      ok: false,
      error: ERROR_CODES.RATE_LIMITED,
      message: "Too many attempts. Please try again in a few minutes.",
    };
  }

  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? "footer",
    company_website: formData.get("company_website") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: ERROR_CODES.VALIDATION,
      message: "Please enter a valid email address.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot: a filled hidden field means a bot.
  if (parsed.data.company_website) {
    return { ok: false, error: ERROR_CODES.SPAM_REJECTED, message: "Submission rejected." };
  }

  if (!isMailConfigured()) {
    console.error("[newsletter] SMTP is not configured; subscriber not delivered");
    return { ok: false, error: ERROR_CODES.SERVER_ERROR, message: "Subscriptions are temporarily unavailable. Please try again later." };
  }
  try {
    await sendMail({
      subject: `New newsletter subscriber: ${parsed.data.email}`,
      rows: [["Email", parsed.data.email], ["Source", parsed.data.source]],
    });
  } catch (err) {
    console.error("[newsletter] send failed:", err instanceof Error ? err.message : err);
    return { ok: false, error: ERROR_CODES.SERVER_ERROR, message: "We couldn't save your subscription right now. Please try again shortly." };
  }
  return { ok: true, data: undefined };
}
