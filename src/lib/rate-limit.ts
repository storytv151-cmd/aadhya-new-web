import { headers } from "next/headers";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

/**
 * Client IP as seen by the nginx reverse proxy in front of this app. Prefers X-Real-IP,
 * then the LAST X-Forwarded-For hop (the one nginx appended — earlier hops are
 * client-controlled and trivially spoofed).
 */
async function clientIp(): Promise<string | null> {
  const h = await headers();
  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const hops = h.get("x-forwarded-for")?.split(",");
  return hops?.[hops.length - 1]?.trim() || null;
}

/**
 * Tiny fixed-window, in-memory rate limiter for Server Actions. Per-process only, which
 * suits the single `next start` instance this site runs as; move to a shared store if it
 * is ever scaled out. Fails open when the client IP is unknown so real visitors are never
 * lumped into one shared bucket.
 */
export async function isRateLimited(
  scope: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): Promise<boolean> {
  const ip = await clientIp();
  if (!ip) return false;

  const now = Date.now();
  const key = `${scope}:${ip}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [staleKey, stale] of buckets) if (stale.resetAt <= now) buckets.delete(staleKey);
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}
