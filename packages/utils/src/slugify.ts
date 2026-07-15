/** Convert an arbitrary string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "") // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text to a maximum length on a word boundary, adding an ellipsis. */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  let end = maxLength;
  // Only walk back to the previous space when we'd otherwise cut mid-word.
  if (input[end] !== " ") {
    const lastSpace = input.lastIndexOf(" ", end);
    if (lastSpace > 0) end = lastSpace;
  }
  return `${input.slice(0, end).trimEnd()}…`;
}
