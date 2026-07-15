import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";
import { revalidateHooks } from "../lib/payload/revalidate";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "publishedAt"],
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks(["/", "/blog"]),
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "category", type: "text", required: true },
    { name: "authorName", type: "text", defaultValue: "Aadhya Infotech" },
    { name: "publishedAt", type: "date", required: true },
    { name: "readingTime", type: "number", admin: { description: "Estimated minutes." } },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "content", type: "richText" },
    { name: "featured", type: "checkbox", defaultValue: false },
    {
      type: "group",
      name: "seo",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};
