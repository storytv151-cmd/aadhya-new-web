import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";
import { revalidateHooks } from "../lib/payload/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: { useAsTitle: "name", group: "Content", defaultColumns: ["name", "company", "order"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks(["/", "/about"]),
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "quote", type: "textarea", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
