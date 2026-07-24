"use server";

import { newsletterSchema, type ApiResult, ERROR_CODES } from "@/types";

/**
 * Newsletter subscription. Validates against the shared contract and rejects honeypot
 * hits. This is a frontend-only build with no data store — wire an email / ESP here to
 * store the subscriber. The return contract is unchanged.
 */
export async function subscribeToNewsletter(
  _prevState: ApiResult | null,
  formData: FormData,
): Promise<ApiResult> {
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

  // TODO: store the subscriber (email / ESP). This build has no backend store.
  return { ok: true, data: undefined };
}
