import type {
  BlogPostSummary,
  Faq,
  ImageAsset,
  PortfolioProject,
  ProcessStep,
  Service,
  Stat,
  Technology,
  Testimonial,
} from "@aadhya/types";
import type { Payload } from "payload";
import * as fallback from "@/content/site-content";
import { getPayloadClient } from "@/lib/payload/client";

/**
 * Content-access layer — the single boundary the UI reads content through.
 *
 * CMS-backed accessors query the Payload Local API and fall back to the typed
 * content in `site-content.ts` in dev / when the CMS is empty or unreachable.
 * Pages are statically generated and revalidated on-demand via `revalidatePath`
 * from the collections' hooks, so no per-query cache is needed here. Presentational
 * content (hero, about, stats, process, tech) stays in code for now.
 */

type MediaDoc = { url?: string | null; alt?: string | null; width?: number; height?: number };

function mapImage(image: unknown): ImageAsset | undefined {
  if (image && typeof image === "object" && "url" in image) {
    const media = image as MediaDoc;
    if (media.url) {
      return { url: media.url, alt: media.alt ?? "", width: media.width, height: media.height };
    }
  }
  return undefined;
}

/**
 * Resolve the Payload client without letting a slow/unreachable database block a
 * page render. `getPayload` hangs (mongoose retries for serverSelectionTimeoutMS)
 * when Mongo is down, and a bare try/catch only guards against *thrown* errors — not
 * a hang. So we race the connect against a short timeout and trip a circuit breaker
 * on failure: the first request pays a small penalty, the rest fall back instantly,
 * and it recovers automatically once the CMS is reachable again.
 */
const CMS_CONNECT_TIMEOUT_MS = 1200;
const CMS_COOLDOWN_MS = 30_000;

let cmsDownUntil = 0;

async function getCmsClient(): Promise<Payload | null> {
  if (Date.now() < cmsDownUntil) return null;
  try {
    const payload = await Promise.race([
      getPayloadClient(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("cms-connect-timeout")), CMS_CONNECT_TIMEOUT_MS),
      ),
    ]);
    cmsDownUntil = 0;
    return payload;
  } catch {
    cmsDownUntil = Date.now() + CMS_COOLDOWN_MS;
    if (process.env.NODE_ENV !== "production") {
      console.warn("[content] CMS unreachable — serving static fallback content.");
    }
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  const payload = await getCmsClient();
  if (!payload) return fallback.services;
  try {
    const { docs } = await payload.find({ collection: "services", sort: "order", limit: 50 });
    if (docs.length === 0) return fallback.services;
    return (
      docs as Array<{
        slug: string;
        title: string;
        description: string;
        icon?: string | null;
        features?: { value: string }[] | null;
      }>
    ).map((d) => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      icon: d.icon ?? undefined,
      features: (d.features ?? []).map((f) => f.value),
    }));
  } catch {
    console.warn("[content] services CMS query failed — using static fallback content.");
    return fallback.services;
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const payload = await getCmsClient();
  if (!payload) return fallback.portfolioProjects;
  try {
    const { docs } = await payload.find({
      collection: "projects",
      sort: "order",
      limit: 50,
      depth: 1,
    });
    if (docs.length === 0) return fallback.portfolioProjects;
    return (
      docs as Array<{
        slug: string;
        title: string;
        category: string;
        description: string;
        technologies?: { value: string }[] | null;
        result?: string | null;
        url?: string | null;
        image?: unknown;
      }>
    ).map((d) => ({
      slug: d.slug,
      title: d.title,
      category: d.category,
      description: d.description,
      technologies: (d.technologies ?? []).map((t) => t.value),
      result: d.result ?? undefined,
      href: d.url ?? undefined,
      image: mapImage(d.image),
    }));
  } catch {
    return fallback.portfolioProjects;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getCmsClient();
  if (!payload) return fallback.testimonials;
  try {
    const { docs } = await payload.find({
      collection: "testimonials",
      sort: "order",
      limit: 50,
      depth: 1,
    });
    if (docs.length === 0) return fallback.testimonials;
    return (
      docs as Array<{
        id: string;
        name: string;
        role: string;
        company: string;
        quote: string;
        rating?: number | null;
        avatar?: unknown;
      }>
    ).map((d) => ({
      id: String(d.id),
      name: d.name,
      role: d.role,
      company: d.company,
      quote: d.quote,
      rating: d.rating ?? 5,
      avatar: mapImage(d.avatar),
    }));
  } catch {
    return fallback.testimonials;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  const payload = await getCmsClient();
  if (!payload) return fallback.faqs;
  try {
    const { docs } = await payload.find({ collection: "faqs", sort: "order", limit: 50 });
    if (docs.length === 0) return fallback.faqs;
    return (
      docs as Array<{ id: string; question: string; answer: string; category?: string | null }>
    ).map((d) => ({
      id: String(d.id),
      question: d.question,
      answer: d.answer,
      category: d.category ?? undefined,
    }));
  } catch {
    return fallback.faqs;
  }
}

export async function getLatestPosts(limit = 3): Promise<BlogPostSummary[]> {
  const payload = await getCmsClient();
  if (!payload) return fallback.blogPosts.slice(0, limit);
  try {
    const { docs } = await payload.find({
      collection: "blog-posts",
      sort: "-publishedAt",
      limit,
      depth: 1,
    });
    if (docs.length === 0) return fallback.blogPosts.slice(0, limit);
    return (
      docs as Array<{
        slug: string;
        title: string;
        excerpt: string;
        category: string;
        authorName?: string | null;
        publishedAt: string;
        readingTime?: number | null;
        image?: unknown;
      }>
    ).map((d) => ({
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      category: d.category,
      author: { name: d.authorName ?? "Aadhya Infotech" },
      publishedAt: d.publishedAt,
      readingTimeMinutes: d.readingTime ?? 5,
      image: mapImage(d.image),
      href: `/blog/${d.slug}`,
    }));
  } catch {
    return fallback.blogPosts.slice(0, limit);
  }
}

// --- Presentational content (kept in code for now) ---

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return fallback.processSteps;
}

export async function getTechnologies(): Promise<Technology[]> {
  return fallback.technologies;
}

export async function getStats(): Promise<Stat[]> {
  return fallback.stats;
}

export function getHeroContent() {
  return fallback.heroContent;
}

export function getAboutContent() {
  return fallback.aboutContent;
}
