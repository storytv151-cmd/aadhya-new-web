"use server";

import {
  contactFormSchema,
  type ApiResult,
  type ContactFormResponse,
  ERROR_CODES,
} from "@aadhya/types";
import { getPayloadClient } from "@/lib/payload/client";

/**
 * Contact / lead capture. Validates against the shared contract, rejects honeypot
 * hits. W5/W8 layer in Turnstile verification, persistence to the Payload `Leads`
 * collection and an email/CRM `afterChange` hook — the return contract is unchanged.
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

  if (parsed.data.company_website) {
    return { ok: false, error: ERROR_CODES.SPAM_REJECTED, message: "Submission rejected." };
  }

  const { company_website: _hp, turnstileToken: _t, ...lead } = parsed.data;

  // TODO: verify Turnstile token here once keys are configured.
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: { ...lead, source: "website" },
      overrideAccess: true,
    });
  } catch (error) {
    // Don't lose the user on a DB hiccup — log for ops (TODO: email/queue fallback).
    console.error("[contact] failed to persist lead", error);
  }

  return { ok: true, data: {} };
}
