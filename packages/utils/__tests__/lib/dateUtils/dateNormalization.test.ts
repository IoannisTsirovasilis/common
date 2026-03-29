import {
  nextYearDate,
  nowInSeconds,
  toDateOnly,
  toLocalISOStringOnly,
} from "../../../src/lib/dateUtils/dateUtils";

describe("toDateOnly", () => {
  it("normalizes a Date to local midnight of that calendar day", () => {
    const withTime = new Date(2025, 4, 20, 14, 30, 45, 123);
    const only = toDateOnly(withTime);
    expect(only.getFullYear()).toBe(2025);
    expect(only.getMonth()).toBe(4);
    expect(only.getDate()).toBe(20);
    expect(only.getHours()).toBe(0);
    expect(only.getMinutes()).toBe(0);
    expect(only.getSeconds()).toBe(0);
  });
});

describe("toLocalISOStringOnly", () => {
  it("formats local calendar date as YYYY-MM-DD", () => {
    expect(toLocalISOStringOnly(new Date(2025, 0, 5))).toBe("2025-01-05");
    expect(toLocalISOStringOnly(new Date(2025, 11, 31))).toBe("2025-12-31");
  });
});

describe("nextYearDate", () => {
  it("advances the calendar year by one", () => {
    const d = new Date(2024, 6, 4);
    const n = nextYearDate(d);
    expect(n.getFullYear()).toBe(2025);
    expect(n.getMonth()).toBe(6);
    expect(n.getDate()).toBe(4);
  });

  it("accepts an ISO string (uses local calendar fields like Date input)", () => {
    const s = "2024-06-15T12:00:00.000Z";
    const base = new Date(s);
    const n = nextYearDate(s);
    expect(n.getFullYear()).toBe(base.getFullYear() + 1);
    expect(n.getMonth()).toBe(base.getMonth());
    expect(n.getDate()).toBe(base.getDate());
  });
});

describe("nowInSeconds", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns Unix seconds aligned with Date.now", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
    expect(nowInSeconds()).toBe(1577836800);
  });
});
