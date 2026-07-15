import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/payload/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: { group: "Settings" },
  access: { read: anyone, update: authenticated },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/", "layout");
        } catch {
          // outside a Next render context
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", defaultValue: "Aadhya Infotech" },
    { name: "tagline", type: "text" },
    { name: "description", type: "textarea" },
    {
      type: "group",
      name: "contact",
      fields: [
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "phoneAlt", type: "text" },
        { name: "address", type: "text" },
        { name: "mapsUrl", type: "text" },
      ],
    },
  ],
};
