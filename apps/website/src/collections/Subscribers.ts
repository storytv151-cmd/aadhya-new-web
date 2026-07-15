import type { CollectionConfig } from "payload";
import { authenticated, never } from "../lib/payload/access";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    group: "Submissions",
    defaultColumns: ["email", "source", "status", "createdAt"],
  },
  access: { read: authenticated, create: never, update: authenticated, delete: authenticated },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "source", type: "text", defaultValue: "footer" },
    {
      name: "status",
      type: "select",
      defaultValue: "subscribed",
      options: ["subscribed", "unsubscribed"],
    },
  ],
};
