import { getPayload } from "payload";
import config from "../payload.config";
import * as content from "../content/site-content";
import { siteConfig } from "../lib/site";

/**
 * Seeds the CMS with Aadhya Infotech's real content and a default admin user.
 * Idempotent — safe to run repeatedly (skips docs that already exist).
 * Run with: pnpm --filter @aadhya/website seed
 */
async function seed() {
  const payload = await getPayload({ config });
  const log = payload.logger;

  // --- Admin user ---
  const users = await payload.count({ collection: "users" });
  if (users.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@aadhyainfotech.com",
        password: "changeme123",
        name: "Aadhya Admin",
      },
    });
    log.info("Created admin user → admin@aadhyainfotech.com / changeme123 (change this!)");
  }

  const seedCollection = async (
    collection: "services" | "projects" | "testimonials" | "faqs" | "blog-posts",
    items: readonly unknown[],
    toData: (item: unknown, index: number) => Record<string, unknown>,
    matchField: "slug" | "question" | "name" = "slug",
    getMatch: (item: unknown) => string = (i) => (i as { slug: string }).slug,
  ) => {
    for (const [index, item] of items.entries()) {
      const existing = await payload.find({
        collection,
        where: { [matchField]: { equals: getMatch(item) } },
        limit: 1,
      });
      if (existing.totalDocs === 0) {
        await payload.create({ collection, data: toData(item, index) as never });
      }
    }
    log.info(`Seeded ${collection}`);
  };

  await seedCollection("services", content.services, (raw, index) => {
    const s = raw as (typeof content.services)[number];
    return {
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon,
      features: s.features.map((value) => ({ value })),
      order: index,
    };
  });

  await seedCollection("projects", content.portfolioProjects, (raw, index) => {
    const p = raw as (typeof content.portfolioProjects)[number];
    return {
      title: p.title,
      slug: p.slug,
      category: p.category,
      description: p.description,
      technologies: p.technologies.map((value) => ({ value })),
      order: index,
    };
  });

  await seedCollection(
    "testimonials",
    content.testimonials,
    (raw, index) => {
      const t = raw as (typeof content.testimonials)[number];
      return {
        name: t.name,
        role: t.role,
        company: t.company,
        quote: t.quote,
        rating: t.rating,
        order: index,
      };
    },
    "name",
    (i) => (i as { name: string }).name,
  );

  await seedCollection(
    "faqs",
    content.faqs,
    (raw, index) => {
      const f = raw as (typeof content.faqs)[number];
      return { question: f.question, answer: f.answer, order: index };
    },
    "question",
    (i) => (i as { question: string }).question,
  );

  await seedCollection("blog-posts", content.blogPosts, (raw) => {
    const b = raw as (typeof content.blogPosts)[number];
    return {
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      category: b.category,
      authorName: b.author.name,
      publishedAt: b.publishedAt,
      readingTime: b.readingTimeMinutes,
    };
  });

  // --- Site settings global ---
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: siteConfig.name,
      tagline: siteConfig.tagline,
      description: siteConfig.description,
      contact: {
        email: siteConfig.contact.email,
        phone: siteConfig.contact.phone,
        phoneAlt: siteConfig.contact.phoneAlt,
        address: siteConfig.contact.address,
        mapsUrl: siteConfig.contact.mapsUrl,
      },
    },
  });
  log.info("Seeded site settings");

  log.info("✔ Seed complete.");
  process.exit(0);
}

await seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
