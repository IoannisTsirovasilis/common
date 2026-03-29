import {
  getDayNamesAbbreviated,
  getDayNumber,
  getMonthName,
  getNextMonth,
  getPreviousMonth,
} from "../../../src/lib/dateUtils/dateUtils";

describe("getMonthName", () => {
  it("returns full month names for indices 0–11", () => {
    expect(getMonthName(0)).toBe("January");
    expect(getMonthName(11)).toBe("December");
    expect(getMonthName(5)).toBe("June");
  });
});

describe("getDayNumber", () => {
  it("returns local calendar day for Date input", () => {
    expect(getDayNumber(new Date(2024, 2, 15))).toBe(15);
    expect(getDayNumber(new Date(2024, 0, 1))).toBe(1);
  });
});

describe("getDayNamesAbbreviated", () => {
  it("returns a copy of abbreviated weekday labels", () => {
    const a = getDayNamesAbbreviated();
    const b = getDayNamesAbbreviated();
    expect(a).toEqual(["S", "M", "T", "W", "T", "F", "S"]);
    expect(a).not.toBe(b);
  });
});

describe("getPreviousMonth", () => {
  it("wraps January to December", () => {
    expect(getPreviousMonth(0)).toBe(11);
  });

  it("decrements other months", () => {
    expect(getPreviousMonth(3)).toBe(2);
    expect(getPreviousMonth(11)).toBe(10);
  });
});

describe("getNextMonth", () => {
  it("wraps December to January", () => {
    expect(getNextMonth(11)).toBe(0);
  });

  it("increments other months", () => {
    expect(getNextMonth(0)).toBe(1);
    expect(getNextMonth(5)).toBe(6);
  });
});
