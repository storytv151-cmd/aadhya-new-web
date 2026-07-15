"use server";

import { newsletterSchema, type ApiResult, ERROR_CODES } from "@aadhya/types";
import { getPayloadClient } from "@/lib/payload/client";

/**
 * Newsletter subscription. Validates against the shared contract now.
 * W8 layers in Turnstile verification and persistence to the Payload `Subscribers`
 * collection; the return contract stays the same.
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

  try {
    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: parsed.data.email } },
      limit: 1,
      overrideAccess: true,
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "subscribers",
        data: { email: parsed.data.email, source: parsed.data.source ?? "footer" },
        overrideAccess: true,
      });
    }
  } catch (error) {
    console.error("[newsletter] failed to persist subscriber", error);
  }

  return { ok: true, data: undefined };
}
