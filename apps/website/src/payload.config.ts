import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { Projects } from "./collections/Projects";
import { Testimonials } from "./collections/Testimonials";
import { Faqs } from "./collections/Faqs";
import { BlogPosts } from "./collections/BlogPosts";
import { Leads } from "./collections/Leads";
import { Subscribers } from "./collections/Subscribers";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Cloudflare R2 (S3-compatible) is used when configured; otherwise media falls back
// to local disk for dev — see docs/ENVIRONMENT.md.
const r2Enabled = Boolean(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: "— Aadhya Infotech CMS",
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Projects,
    Testimonials,
    Faqs,
    BlogPosts,
    Leads,
    Subscribers,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  // Fail fast when Mongo is unreachable (3s) instead of mongoose's 30s default, so
  // dev renders fall back to static content quickly — see lib/content getCmsClient.
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
    connectOptions: { serverSelectionTimeoutMS: 3000 },
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  localization: {
    locales: ["en"],
    defaultLocale: "en",
    fallback: true,
  },
  plugins: r2Enabled
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.R2_BUCKET as string,
          config: {
            endpoint: process.env.R2_ENDPOINT,
            region: process.env.R2_REGION || "auto",
            credentials: {
              accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
            },
          },
        }),
      ]
    : [],
});
