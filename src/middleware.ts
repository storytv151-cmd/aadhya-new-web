import { NextResponse, type NextRequest } from "next/server";

/**
 * Security headers + Content-Security-Policy for the public site.
 *
 * DESIGN NOTE — static CSP, not per-request nonce:
 * A per-request nonce would force every page into dynamic rendering (the nonce must
 * be embedded in each response's <script> tags), which conflicts with our SSG/ISR
 * performance goal (Lighthouse ≥95). So we ship a *constant* CSP: every source is
 * locked to 'self' + explicit allowlists, with framework inline scripts permitted
 * (unavoidable with statically-rendered Next + next-themes). This preserves static
 * rendering while still blocking external script/style/frame injection.
 *
 * The matcher skips only Next internals and static assets.
 */
const isDev = process.env.NODE_ENV !== "production";

function buildContentSecurityPolicy(): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", "https:"],
    "font-src": ["'self'", "data:"],
    "connect-src": [
      "'self'",
      "https://challenges.cloudflare.com",
      ...(isDev ? ["ws:", "wss:"] : []),
    ],
    // Cloudflare Turnstile renders in an iframe.
    "frame-src": ["'self'", "https://challenges.cloudflare.com"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
  };

  let policy = Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");

  if (!isDev) policy += "; upgrade-insecure-requests";
  return policy;
}

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy());
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  );
  if (!isDev) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  return response;
}

export const config = {
  // Apply to all routes except Next internals and static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
