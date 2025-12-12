import {
  formatDate,
  formatDayMonth,
} from "../../../src/lib/dateUtils/dateUtils";
import { DEFAULT_DATE_FORMAT } from "../../../src/lib/constants/dateConstants";

// Ensure Jest's expect is used, not Node's assert
// declare const expect: jest.Expect;

describe("formatDate edge cases", () => {
  it("should return empty string when date is undefined", () => {
    expect(formatDate(undefined, "DD/MM/YYYY")).toBe("");
  });

  it("should return empty string when date is empty string", () => {
    expect(formatDate("", "DD/MM/YYYY")).toBe("");
  });
});

describe("formatDate DEFAULT_DATE_FORMAT", () => {
  it("should return the original date when format is DEFAULT_DATE_FORMAT", () => {
    const date = "2024-03-15";
    expect(formatDate(date, DEFAULT_DATE_FORMAT)).toBe(date);
  });

  it("should return the original date when format is YYYY-MM-DD", () => {
    const date = "2024-03-15";
    expect(formatDate(date, "YYYY-MM-DD")).toBe(date);
  });
});

describe("formatDate DD/MM/YY format", () => {
  it("should format date correctly for DD/MM/YY", () => {
    expect(formatDate("2024-03-15", "DD/MM/YY")).toBe("15/03/24");
  });

  it("should handle single digit day and month for DD/MM/YY", () => {
    expect(formatDate("2024-01-05", "DD/MM/YY")).toBe("05/01/24");
  });

  it("should handle leap year for DD/MM/YY", () => {
    expect(formatDate("2024-02-29", "DD/MM/YY")).toBe("29/02/24");
  });
});

describe("formatDate DD/MM/YYYY format", () => {
  it("should format date correctly for DD/MM/YYYY", () => {
    expect(formatDate("2024-03-15", "DD/MM/YYYY")).toBe("15/03/2024");
  });

  it("should handle single digit day and month for DD/MM/YYYY", () => {
    expect(formatDate("2024-01-05", "DD/MM/YYYY")).toBe("05/01/2024");
  });

  it("should handle leap year for DD/MM/YYYY", () => {
    expect(formatDate("2024-02-29", "DD/MM/YYYY")).toBe("29/02/2024");
  });
});

describe("formatDate DD Month YYYY format", () => {
  it("should format date correctly for DD Month YYYY", () => {
    expect(formatDate("2024-03-15", "DD Month YYYY")).toBe("15 Mar 2024");
  });

  it("should handle single digit day for DD Month YYYY", () => {
    expect(formatDate("2024-01-05", "DD Month YYYY")).toBe("05 Jan 2024");
  });

  it("should handle December for DD Month YYYY", () => {
    expect(formatDate("2024-12-25", "DD Month YYYY")).toBe("25 Dec 2024");
  });

  it("should handle February for DD Month YYYY", () => {
    expect(formatDate("2024-02-14", "DD Month YYYY")).toBe("14 Feb 2024");
  });
});

describe("formatDate MM/DD/YY format", () => {
  it("should format date correctly for MM/DD/YY", () => {
    expect(formatDate("2024-03-15", "MM/DD/YY")).toBe("03/15/24");
  });

  it("should handle single digit day and month for MM/DD/YY", () => {
    expect(formatDate("2024-01-05", "MM/DD/YY")).toBe("01/05/24");
  });

  it("should handle leap year for MM/DD/YY", () => {
    expect(formatDate("2024-02-29", "MM/DD/YY")).toBe("02/29/24");
  });
});

describe("formatDate MM/DD/YYYY format", () => {
  it("should format date correctly for MM/DD/YYYY", () => {
    expect(formatDate("2024-03-15", "MM/DD/YYYY")).toBe("03/15/2024");
  });

  it("should handle single digit day and month for MM/DD/YYYY", () => {
    expect(formatDate("2024-01-05", "MM/DD/YYYY")).toBe("01/05/2024");
  });

  it("should handle leap year for MM/DD/YYYY", () => {
    expect(formatDate("2024-02-29", "MM/DD/YYYY")).toBe("02/29/2024");
  });
});

describe("formatDate Month DD, YYYY format", () => {
  it("should format date correctly for Month DD, YYYY", () => {
    expect(formatDate("2024-03-15", "Month DD, YYYY")).toBe("Mar 15, 2024");
  });

  it("should handle single digit day for Month DD, YYYY", () => {
    expect(formatDate("2024-01-05", "Month DD, YYYY")).toBe("Jan 05, 2024");
  });

  it("should handle December for Month DD, YYYY", () => {
    expect(formatDate("2024-12-25", "Month DD, YYYY")).toBe("Dec 25, 2024");
  });

  it("should handle February for Month DD, YYYY", () => {
    expect(formatDate("2024-02-14", "Month DD, YYYY")).toBe("Feb 14, 2024");
  });
});

describe("formatDate edge cases and special dates", () => {
  it("should handle New Year's Day", () => {
    expect(formatDate("2024-01-01", "DD/MM/YYYY")).toBe("01/01/2024");
    expect(formatDate("2024-01-01", "Month DD, YYYY")).toBe("Jan 01, 2024");
  });

  it("should handle Christmas Day", () => {
    expect(formatDate("2024-12-25", "DD/MM/YYYY")).toBe("25/12/2024");
    expect(formatDate("2024-12-25", "Month DD, YYYY")).toBe("Dec 25, 2024");
  });

  it("should handle leap year February 29th", () => {
    expect(formatDate("2024-02-29", "DD/MM/YYYY")).toBe("29/02/2024");
    expect(formatDate("2024-02-29", "Month DD, YYYY")).toBe("Feb 29, 2024");
  });

  it("should handle all months correctly", () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let month = 1; month <= 12; month += 1) {
      const date = `2024-${month.toString().padStart(2, "0")}-15`;
      const expectedMonth = months[month - 1];
      expect(formatDate(date, "Month DD, YYYY")).toBe(
        `${expectedMonth} 15, 2024`,
      );
    }
  });
});

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
});
