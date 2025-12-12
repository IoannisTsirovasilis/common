import { useMemo } from "react";
import { getNextMonth } from "@fistware/utils";
import { RightArrow } from "../../components/Icons/RightArrow";
import { LeftArrow } from "../../components/Icons/LeftArrow";

export function useCalendarNavigation(
  props: CalendarMonthNavigationButtonProps,
) {
  const { type } = props;

  const handleMonthNavigation = useMemo(() => {
    if (type === "next") {
      return () => handleNextMonth(props);
    }
    return () => handlePreviousMonth(props);
  }, [type, props]);

  return {
    handleMonthNavigation,
    arrowIcon: getArrowIcon(type),
  };
}

function getArrowIcon(type: CalendarMonthNavigationButtonType) {
  if (type === "next") {
    return <RightArrow />;
  }
  return <LeftArrow />;
}

export function handleNextMonth(props: CalendarMonthNavigationButtonProps) {
  const { month, year, setMonth, setYear } = props;
  const nextMonth = getNextMonth(month);
  setMonth(nextMonth);
  if (nextMonth === 0) {
    setYear(year + 1);
  }
}

export function handlePreviousMonth(props: CalendarMonthNavigationButtonProps) {
  const { month, year, setMonth, setYear } = props;
  const previousMonth = month === 0 ? 11 : month - 1;
  setMonth(previousMonth);
  if (previousMonth === 11) {
    setYear(year - 1);
  }
}

export interface CalendarMonthNavigationButtonProps {
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  type: CalendarMonthNavigationButtonType;
}

export type CalendarMonthNavigationButtonType = "next" | "previous";
