import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Admin",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "name", type: "text" }],
};
