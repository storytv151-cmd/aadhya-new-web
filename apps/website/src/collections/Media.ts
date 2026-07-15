import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // Local disk fallback for dev; overridden by the S3/R2 storage plugin in prod.
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "og", width: 1200, height: 630 },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true, label: "Alt text" },
    { name: "caption", type: "text" },
  ],
};
