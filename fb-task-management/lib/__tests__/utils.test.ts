import { cn } from "../utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toContain("bg-red-500");
    expect(result).toContain("text-white");
  });

  it("handles conditional classes", () => {
    const result = cn("base-class", true && "conditional-class", false && "hidden-class");
    expect(result).toContain("base-class");
    expect(result).toContain("conditional-class");
    expect(result).not.toContain("hidden-class");
  });

  it("handles undefined and null values", () => {
    const result = cn("base-class", undefined, null, "other-class");
    expect(result).toContain("base-class");
    expect(result).toContain("other-class");
  });

  it("returns empty string for no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("basic functionality works", () => {
    const result = cn("test-class");
    expect(result).toBe("test-class");
  });
});