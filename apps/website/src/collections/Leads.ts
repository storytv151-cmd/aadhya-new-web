import type { CollectionConfig } from "payload";
import { authenticated, never } from "../lib/payload/access";

/**
 * Contact / lead submissions. `create` is blocked on the public API — the in-app
 * Server Action writes via the Local API (overrideAccess), so leads only enter
 * through the hardened, validated, spam-checked path.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    group: "Submissions",
    defaultColumns: ["name", "email", "service", "status", "createdAt"],
  },
  access: { read: authenticated, create: never, update: authenticated, delete: authenticated },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "company", type: "text" },
    { name: "service", type: "text" },
    { name: "budget", type: "text" },
    { name: "message", type: "textarea", required: true },
    { name: "source", type: "text", defaultValue: "website" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "contacted", "qualified", "won", "lost"],
    },
  ],
};
