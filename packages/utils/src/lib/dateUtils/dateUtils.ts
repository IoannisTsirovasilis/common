import {
  DAY_NAMES_ABBREVIATED,
  MONTH_NAMES,
  MONTH_NAMES_ABBREVIATED,
} from "../constants/dateConstants";
import { DEFAULT_DATE_FORMAT } from "../constants/dateConstants";

function toDate(date: string | Date): Date {
  return typeof date === "string" ? new Date(date) : date;
}

/**
 * Get the name of a month.
 * @param month - The month to get the name of. This should be a number between 0 and 11.
 * @returns The name of the month (e.g. "January", "February", "March", etc.).
 */
export function getMonthName(month: number): string {
  const monthNames = [...MONTH_NAMES];
  return monthNames[month];
}

/**
 * Get the day number of a date.
 * @param date - The date to get the day number of. This should be a Date object or a string in the format of YYYY-MM-DD.
 * @returns The day number of the date (e.g. 1, 2, 3, etc.).
 */
export function getDayNumber(date: string | Date): number {
  const tempDate = toDate(date);

  return tempDate.getDate();
}

/**
 * Get the abbreviated day names.
 * @returns The abbreviated day names (e.g. "S", "M", "T", "W", "T", "F", "S").
 */
export function getDayNamesAbbreviated(): string[] {
  return [...DAY_NAMES_ABBREVIATED];
}

/**
 * Get the previous month.
 * @param month - The month to get the previous month of. This should be a number between 0 and 11.
 * @returns The previous month (e.g. 11, 10, 9, etc.).
 */
export function getPreviousMonth(month: number): number {
  return month === 0 ? 11 : month - 1;
}

/**
 * Get the next month.
 * @param month - The month to get the next month of. This should be a number between 0 and 11.
 * @returns The next month (e.g. 1, 2, 3, etc.).
 */
export function getNextMonth(month: number): number {
  return month === 11 ? 0 : month + 1;
}

/**
 * Get the date only.
 * @param date - The date to get the date only of. This should be a Date object or a string in the format of YYYY-MM-DD.
 * @returns The date only (e.g. 2025-01-01).
 */
export function toDateOnly(date: Date | string): Date {
  const tempDate = toDate(date);
  return new Date(
    tempDate.getFullYear(),
    tempDate.getMonth(),
    tempDate.getDate(),
  );
}

/**
 * Get the local ISO string only.
 * @param date - The date to get the local ISO string only of. This should be a Date object or a string in the format of YYYY-MM-DD.
 * @returns The local ISO string only (e.g. 2025-01-01).
 */
export function toLocalISOStringOnly(date: Date | string): string {
  const tempDate = toDate(date);
  const year = tempDate.getFullYear();
  const month = (tempDate.getMonth() + 1).toString().padStart(2, "0");
  const day = tempDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get the next year date.
 * @param date - The date to get the next year date of. This should be a Date object or a string in the format of YYYY-MM-DD.
 * @returns The next year date (e.g. 2026-01-01).
 */
export function nextYearDate(date: Date | string): Date {
  const tempDate = toDate(date);
  const nextYear = 1;
  return new Date(
    tempDate.getFullYear() + nextYear,
    tempDate.getMonth(),
    tempDate.getDate(),
  );
}

/**
 * Get the current time in seconds.
 * @returns The current time in seconds.
 */
export function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Get the ISO string.
 * @param year - The year to get the ISO string of.
 * @param month - The month to get the ISO string of. This should be a number between 0 and 11.
 * @param day - The day to get the ISO string of. This should be a number between 1 and 31.
 * @returns The ISO string (e.g. 2025-01-01).
 */
export function toISOString(year: number, month: number, day: number): string {
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

/**
 * Get the year, month, and day from an ISO string.
 * @param isoString - The ISO string to get the year, month, and day from. This should be in the format of YYYY-MM-DD.
 * @param separator - The separator to use. This should be a string.
 * @returns The year, month, and day from the ISO string.
 * @example
 * ```ts
 * const { year, month, day } = fromISOString("2025-01-01");
 * console.log(year, month, day); // 2025, 1, 1
 * ```
 */
export function fromISOString(
  isoString: string,
  separator: string = "-",
): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = isoString.split(separator).map(Number);
  return { year, month, day };
}

/**
 *
 * @param date - The date to format. This should be in the format of --MM-DD.
 * @param dateFormat - The date format to use.
 * @returns The formatted date.
 */
export function formatDayMonth(
  date: string | undefined,
  dateFormat: string,
): string {
  if (!date) {
    return "";
  }

  const d = date.substring(2);

  if (dateFormat === DEFAULT_DATE_FORMAT) {
    return d;
  }

  const [month, day] = d.split("-");

  const mm = month.padStart(2, "0");
  const dd = day.padStart(2, "0");
  const monthName = MONTH_NAMES_ABBREVIATED[parseInt(month, 10) - 1];

  let result = dateFormat;

  // remove YYYY or YY and the first character before and after those YYYY or YY characters
  // result = result.replace(/.?YYYY.?|.?YY.?/g, "");
  // remove YYYY/YY plus any surrounding non-alphanumeric chars
  result = result.replace(
    /[^0-9A-Za-z]*YYYY[^0-9A-Za-z]*|[^0-9A-Za-z]*YY[^0-9A-Za-z]*/g,
    "",
  );

  result = result
    .replace(/MM/g, mm)
    .replace(/DD/g, dd)
    .replace(/Month/g, monthName);

  return result;
}

/**
 *
 * @param date - The date to format. This should be in the format of YYYY-MM-DD.
 * @param dateFormat - The date format to use.
 * @returns The formatted date.
 */
export function formatDate(
  date: string | undefined,
  dateFormat: string,
): string {
  if (!date) {
    return "";
  }

  if (dateFormat === DEFAULT_DATE_FORMAT) {
    return date;
  }

  const [year, month, day] = date.split("-");

  const yy = year.slice(-2);
  const mm = month.padStart(2, "0");
  const dd = day.padStart(2, "0");
  const monthName = MONTH_NAMES_ABBREVIATED[parseInt(month, 10) - 1];

  let result = dateFormat;

  result = result
    .replace(/YYYY/g, year)
    .replace(/YY/g, yy)
    .replace(/MM/g, mm)
    .replace(/DD/g, dd)
    .replace(/Month/g, monthName);

  return result;
}

/**
 * Get the time string.
 * @param hours - The hours to get the time string of.
 * @param minutes - The minutes to get the time string of.
 * @returns The time string (e.g. 12:00).
 */
export function toTimeString(hours: number, minutes: number): string {
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/**
 *
 * @param date - The date to get the first and last day of the month of. This should be in the format of YYYY-MM-DD.
 * @returns The first and last day of the month.
 * @example
 * ```ts
 * const { firstDay, lastDay } = getFirstAndLastDayOfMonth("2025-01-01");
 * console.log(firstDay, lastDay); // 2025-01-01, 2025-01-31
 * ```
 */
export function getFirstAndLastDayOfMonth(date: string | Date): {
  firstDay: Date;
  lastDay: Date;
} {
  const tempDate = toDate(date);

  const firstDay = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
  const lastDay = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);

  return { firstDay, lastDay };
}

/**
 * Add days to a date.
 * @param date - The date to add days to. This should be in the format of YYYY-MM-DD.
 * @param days - The number of days to add.
 * @returns The date with the days added.
 * @example
 * ```ts
 * const newDate = addDays("2025-01-01", 1);
 * console.log(newDate); // 2025-01-02
 * ```
 */
export function addDays(date: string | Date, days: number): Date {
  const tempDate = toDate(date);

  return new Date(tempDate.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Add months to a date.
 * @param date - The date to add months to. This should be in the format of YYYY-MM-DD.
 * @param months - The number of months to add.
 * @returns The date with the months added.
 * @example
 */
export function addMonths(date: string | Date, months: number): Date {
  const tempDate = toDate(date);

  return new Date(
    tempDate.getFullYear(),
    tempDate.getMonth() + months,
    tempDate.getDate(),
  );
}
