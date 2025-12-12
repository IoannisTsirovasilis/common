import { useState } from "react";
import { fromISOString, getDaysToDisplay } from "@fistware/utils";
import { useClickOutside } from "./common/useClickOutside";

export function useFloatingCalendarInput(
  props: UseFloatingCalendarInputProps,
): UseFloatingCalendarInput {
  const { value, isExpanded, setIsExpanded, parentRef, ref } = props;
  const now = value
    ? fromISOString(value, "-")
    : {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };

  const [browsedMonth, setBrowsedMonth] = useState(now.month - 1);
  const [browsedYear, setBrowsedYear] = useState(now.year);

  const [selectedDay, setSelectedDay] = useState(now.day);
  const [selectedMonth, setSelectedMonth] = useState(now.month - 1);
  const [selectedYear, setSelectedYear] = useState(now.year);

  const daysToDisplay = getDaysToDisplay(browsedMonth, browsedYear);

  useClickOutside({
    ref,
    parentRef,
    isOpen: isExpanded,
    setIsOpen: setIsExpanded,
  });

  return {
    browsedMonth,
    browsedYear,
    setBrowsedMonth,
    setBrowsedYear,
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDay,
    setSelectedMonth,
    setSelectedYear,
    daysToDisplay,
  };
}

export interface UseFloatingCalendarInputProps {
  value?: string;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

export interface UseFloatingCalendarInput {
  browsedMonth: number;
  browsedYear: number;
  setBrowsedMonth: (month: number) => void;
  setBrowsedYear: (year: number) => void;
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  setSelectedDay: (day: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  daysToDisplay: Array<{ day: number; type: string }>;
}
