/**
 * Get the days to display for a given month and year.
 * @param browsedMonth - The month to display.
 * @param browsedYear - The year to display.
 * @returns The days to display.
 */
export function getDaysToDisplay(browsedMonth: number, browsedYear?: number) {
  if (browsedYear) {
    return getDaysToDisplayForYear(browsedMonth, browsedYear);
  }
  return getDaysToDisplayForMonth(browsedMonth);
}

/**
 * Get the days to display for a given month.
 * @param browsedMonth - The month to display.
 * @returns The days to display.
 */
function getDaysToDisplayForMonth(browsedMonth: number) {
  const daysInMonth = new Date(2025, browsedMonth + 1, 0).getDate();
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    type: "current",
  }));

  return currentMonthDays;
}

/**
 * Get the days to display for a given year.
 * @param browsedMonth - The month to display.
 * @param browsedYear - The year to display.
 * @returns The days to display.
 */
function getDaysToDisplayForYear(browsedMonth: number, browsedYear: number) {
  const firstDayOfMonth = new Date(browsedYear, browsedMonth, 1).getDay();
  const daysInMonth = new Date(browsedYear, browsedMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(browsedYear, browsedMonth, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    type: "previous",
  }));

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    type: "current",
  }));

  const totalDays = prevMonthDays.length + currentMonthDays.length;

  const totalCells = Math.ceil(totalDays / 7) * 7;

  const nextMonthDaysNeeded = totalCells - totalDays;

  const nextMonthDays = Array.from({ length: nextMonthDaysNeeded }, (_, i) => ({
    day: i + 1,
    type: "next",
  }));

  const daysToDisplay = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  return daysToDisplay;
}
