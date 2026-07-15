/**
 * Shared API envelope types used by both the in-app Server Actions and the
 * Fastify service, so client and server always agree on the wire shape.
 */

export type ApiSuccess<T = undefined> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  /** Machine-readable error code, e.g. `validation_error`, `rate_limited`. */
  error: string;
  /** Human-readable message safe to surface to users. */
  message: string;
  /** Field-level validation messages, keyed by field name. */
  fieldErrors?: Record<string, string[]>;
};

export type ApiResult<T = undefined> = ApiSuccess<T> | ApiFailure;

export const ERROR_CODES = {
  VALIDATION: "validation_error",
  RATE_LIMITED: "rate_limited",
  SPAM_REJECTED: "spam_rejected",
  CAPTCHA_FAILED: "captcha_failed",
  SERVER_ERROR: "server_error",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
