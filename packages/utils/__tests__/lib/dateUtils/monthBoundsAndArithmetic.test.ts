import {
  addDays,
  addMonths,
  getFirstAndLastDayOfMonth,
} from "../../../src/lib/dateUtils/dateUtils";

describe("getFirstAndLastDayOfMonth", () => {
  it("returns first and last day for a month (Date input)", () => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
      new Date(2024, 2, 15),
    );
    expect(firstDay.getFullYear()).toBe(2024);
    expect(firstDay.getMonth()).toBe(2);
    expect(firstDay.getDate()).toBe(1);
    expect(lastDay.getFullYear()).toBe(2024);
    expect(lastDay.getMonth()).toBe(2);
    expect(lastDay.getDate()).toBe(31);
  });

  it("handles February in a leap year", () => {
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
      new Date(2024, 1, 10),
    );
    expect(firstDay.getDate()).toBe(1);
    expect(lastDay.getDate()).toBe(29);
  });
});

describe("addDays", () => {
  it("adds days to a Date", () => {
    const start = new Date(2024, 2, 1);
    const end = addDays(start, 1);
    expect(end.getFullYear()).toBe(2024);
    expect(end.getMonth()).toBe(2);
    expect(end.getDate()).toBe(2);
  });

  it("subtracts days when negative", () => {
    const start = new Date(2024, 2, 10);
    const end = addDays(start, -3);
    expect(end.getDate()).toBe(7);
  });

  it("accepts an ISO string (exercises toDate string branch)", () => {
    const end = addDays("2024-03-01T12:00:00.000Z", 1);
    expect(end.toISOString().startsWith("2024-03-02T")).toBe(true);
  });
});

describe("addMonths", () => {
  it("adds months preserving day when possible", () => {
    const start = new Date(2024, 0, 15);
    const end = addMonths(start, 1);
    expect(end.getFullYear()).toBe(2024);
    expect(end.getMonth()).toBe(1);
    expect(end.getDate()).toBe(15);
  });

  it("rolls over when target month has fewer days", () => {
    const start = new Date(2024, 0, 31);
    const end = addMonths(start, 1);
    expect(end.getMonth()).toBe(2);
    expect(end.getDate()).toBe(2);
  });
});
