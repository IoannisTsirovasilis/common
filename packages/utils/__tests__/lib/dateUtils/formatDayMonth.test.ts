import { formatDayMonth } from "../../../src/lib/dateUtils/dateUtils";
import { DEFAULT_DATE_FORMAT } from "../../../src/lib/constants/dateConstants";

describe("formatDayMonth", () => {
  it("should format date correctly for --MM-DD to DD/MM/YYYY", () => {
    expect(formatDayMonth("--03-15", "DD/MM/YYYY")).toBe("15/03");
  });

  it("should format date correctly for --MM-DD to YYYY-MM-DD", () => {
    expect(formatDayMonth("--03-15", "YYYY-MM-DD")).toBe("03-15");
  });

  it("should format date correctly for --MM-DD to MM/DD/YY", () => {
    expect(formatDayMonth("--03-15", "MM/DD/YY")).toBe("03/15");
  });

  it("should format date correctly for --MM-DD to Month DD, YYYY", () => {
    expect(formatDayMonth("--03-15", "Month DD, YYYY")).toBe("Mar 15");
  });

  it("should format date correctly for --MM-DD to DD Month YYYY", () => {
    expect(formatDayMonth("--03-15", "DD Month YYYY")).toBe("15 Mar");
  });

  it("should format date correctly for --MM-DD to DD/MM/YY format", () => {
    expect(formatDayMonth("--03-15", "DD/MM/YY")).toBe("15/03");
  });

  it("should format date correctly for --MM-DD to MM/DD/YYYY format", () => {
    expect(formatDayMonth("--03-15", "MM/DD/YYYY")).toBe("03/15");
  });

  it("should return empty string when date is undefined or empty", () => {
    expect(formatDayMonth(undefined, "DD/MM/YYYY")).toBe("");
    expect(formatDayMonth("", "DD/MM/YYYY")).toBe("");
  });

  it("should return MM-DD tail when format is DEFAULT_DATE_FORMAT", () => {
    expect(formatDayMonth("--03-15", DEFAULT_DATE_FORMAT)).toBe("03-15");
  });

  it("should strip year tokens from format before replacing MM/DD/Month", () => {
    expect(formatDayMonth("--01-07", "DD/MM/YYYY")).toBe("07/01");
    expect(formatDayMonth("--12-01", "YYYY-MM-DD")).toBe("12-01");
  });
});
