import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Returns Payload hooks that revalidate the given Next paths whenever the collection
 * changes — the on-demand ISR mechanism for our statically-generated pages. Wrapped
 * in try/catch so it is a no-op outside a Next context (e.g. the seed script).
 */
export function revalidateHooks(paths: string[]): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} {
  const bump = () => {
    for (const path of paths) {
      try {
        revalidatePath(path);
      } catch {
        // Not in a Next request/render context — safe to ignore.
      }
    }
  };

  return {
    afterChange: [
      ({ doc }) => {
        bump();
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        bump();
        return doc;
      },
    ],
  };
}
