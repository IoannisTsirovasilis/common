import {
  fromISOString,
  toISOString,
  toTimeString,
} from "../../../src/lib/dateUtils/dateUtils";

describe("toISOString", () => {
  it("pads month and day to two digits", () => {
    expect(toISOString(2025, 3, 7)).toBe("2025-03-07");
    expect(toISOString(2025, 12, 1)).toBe("2025-12-01");
    expect(toISOString(2025, 1, 5)).toBe("2025-01-05");
  });
});

describe("fromISOString", () => {
  it("parses default hyphen-separated dates", () => {
    expect(fromISOString("2025-01-01")).toEqual({
      year: 2025,
      month: 1,
      day: 1,
    });
  });

  it("accepts a custom separator", () => {
    expect(fromISOString("2025/06/15", "/")).toEqual({
      year: 2025,
      month: 6,
      day: 15,
    });
  });
});

describe("toTimeString", () => {
  it("pads hours and minutes", () => {
    expect(toTimeString(9, 5)).toBe("09:05");
    expect(toTimeString(0, 0)).toBe("00:00");
    expect(toTimeString(23, 59)).toBe("23:59");
  });
});
