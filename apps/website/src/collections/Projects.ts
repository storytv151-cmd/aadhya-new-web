import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";
import { revalidateHooks } from "../lib/payload/revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "category", "order"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks(["/", "/portfolio"]),
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "category", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "technologies",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "result", type: "text" },
    { name: "url", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
