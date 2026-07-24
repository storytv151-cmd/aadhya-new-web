"use server";

import {
  contactFormSchema,
  type ApiResult,
  type ContactFormResponse,
  ERROR_CODES,
} from "@aadhya/types";

/**
 * Contact / lead capture. Validates against the shared contract and rejects honeypot
 * hits. This is a frontend-only build with no data store — wire an email / CRM /
 * webhook here to deliver the lead. The return contract is unchanged.
 */
export async function submitContact(
  _prevState: ApiResult<ContactFormResponse> | null,
  formData: FormData,
): Promise<ApiResult<ContactFormResponse>> {
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

  // TODO: deliver the lead (email / CRM / webhook). This build has no backend store.
  return { ok: true, data: {} };
}
