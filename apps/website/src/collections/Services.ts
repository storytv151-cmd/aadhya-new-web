import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";
import { revalidateHooks } from "../lib/payload/revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "icon", "order"] },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks(["/", "/services"]),
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "icon",
      type: "text",
      admin: { description: "lucide-react icon name, e.g. smartphone, globe, cloud." },
    },
    {
      name: "features",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
