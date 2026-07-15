import { describe, expect, it } from "vitest";
import { cn, clamp, formatCompactNumber, mapRange, slugify, truncate } from "./index";

describe("cn", () => {
  it("merges conflicting tailwind classes with the last winning", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    const hidden = false;
    expect(cn("text-red-500", hidden && "hidden", "text-blue-500")).toBe("text-blue-500");
  });
});

describe("slugify", () => {
  it("produces url-safe slugs", () => {
    expect(slugify("  Web To App!  ")).toBe("web-to-app");
    expect(slugify("Café & Co.")).toBe("cafe-co");
  });
});

describe("truncate", () => {
  it("truncates on a word boundary", () => {
    expect(truncate("the quick brown fox", 9)).toBe("the quick…");
    expect(truncate("short", 20)).toBe("short");
  });
});

describe("number helpers", () => {
  it("clamps values", () => {
    expect(clamp(12, 0, 10)).toBe(10);
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it("maps ranges", () => {
    expect(mapRange(0.5, 0, 1, 0, 100)).toBe(50);
  });

  it("formats compact numbers", () => {
    expect(formatCompactNumber(1200)).toBe("1.2K");
  });
});
