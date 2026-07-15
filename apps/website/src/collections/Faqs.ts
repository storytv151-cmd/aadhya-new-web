import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";
import { revalidateHooks } from "../lib/payload/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    useAsTitle: "question",
    group: "Content",
    defaultColumns: ["question", "category", "order"],
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: revalidateHooks(["/"]),
  defaultSort: "order",
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "category", type: "text" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
