# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-02-12

### Changed
- Update Node.js requirement to >= 24.0.0

## [1.1.0] - 2025-12-12
### Added
- `addDays()` function to add days to a date
- `addMonths()` function to add months to a date
- `getFirstAndLastDayOfMonth()` function to get the first and last day of a month
- `getMonthName()` function to get the name of a month
- `getDayNumber()` function to get the number of a day
- `getDayNamesAbbreviated()` function to get the abbreviated names of the days of the week
- `getDaysToDisplay()` function to get the days to display for a given month and year (calendar)
- `getPreviousMonth()` function to get the previous month
- `getNextMonth()` function to get the next month
- `toDateOnly()` function to get the date only
- `toLocalISOStringOnly()` function to get the local ISO string only
- `nextYearDate()` function to get the next year date
- `nowInSeconds()` function to get the current time in seconds
- `toISOString()` function to get the ISO string
- `fromISOString()` function to get the date from an ISO string
- `formatDayMonth()` function to format the day and month
- `formatDate()` function to format the date
- `toTimeString()` function to get the time string from hours and minutes
- `getFirstAndLastDayOfMonth()` function to get the first and last day of a month
- `MONTH_NAMES` constant to get the names of the months
- `MONTH_NAMES_ABBREVIATED` constant to get the abbreviated names of the months
- `DAY_NAMES` constant to get the names of the days of the week
- `DAY_NAMES_ABBREVIATED` constant to get the abbreviated names of the days of the week
- `DAY_NAMES_SHORT` constant to get the short names of the days of the week
- `DEFAULT_DATE_FORMAT` constant to get the default date format

## [1.0.0] - 2025-08-13

### Added
- Initial release of @fistware/utils package
- `getUnixTimestamp()` function to get current Unix timestamp in seconds
- TypeScript support with proper type definitions
- ESLint configuration for code quality
- Build system with TypeScript compilation

### Technical Details
- Node.js >= 22.0.0 requirement
- TypeScript 5.9.2+ support
- ES modules support
- Zero runtime dependencies

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities
