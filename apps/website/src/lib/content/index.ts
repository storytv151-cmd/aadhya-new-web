import type {
  BlogPostSummary,
  Faq,
  PortfolioProject,
  ProcessStep,
  Service,
  Stat,
  Technology,
  Testimonial,
} from "@aadhya/types";
import * as content from "@/content/site-content";

/**
 * Content-access layer — the single boundary the UI reads content through.
 *
 * This is a frontend-only build: every accessor returns the typed content in
 * `site-content.ts`. The async signatures are kept so a CMS could later back these
 * accessors without touching any caller.
 */

export async function getServices(): Promise<Service[]> {
  return content.services;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return content.portfolioProjects;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return content.testimonials;
}

export async function getFaqs(): Promise<Faq[]> {
  return content.faqs;
}

export async function getLatestPosts(limit = 3): Promise<BlogPostSummary[]> {
  return content.blogPosts.slice(0, limit);
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return content.processSteps;
}

export async function getTechnologies(): Promise<Technology[]> {
  return content.technologies;
}

export async function getStats(): Promise<Stat[]> {
  return content.stats;
}

export function getHeroContent() {
  return content.heroContent;
}

export function getAboutContent() {
  return content.aboutContent;
}
