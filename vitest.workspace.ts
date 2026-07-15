import { defineWorkspace } from "vitest/config";

// Auto-discovers a vitest config in each package/app that defines tests.
export default defineWorkspace(["packages/*", "apps/*"]);
