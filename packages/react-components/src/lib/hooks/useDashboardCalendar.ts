import { useState } from "react";
import { getDaysToDisplay } from "@fistware/utils";
import { useClickOutside } from "./common/useClickOutside";

export function useDashboardCalendar(
  props: UseDashboardCalenderProps,
): UseDashboardCalendar {
  const { value, isExpanded, setIsExpanded, parentRef, ref } = props;
  const now = value ? new Date(value) : new Date();

  const [browsedMonth, setBrowsedMonth] = useState(now.getMonth());
  const [browsedYear, setBrowsedYear] = useState(now.getFullYear());

  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

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

export interface UseDashboardCalenderProps {
  value?: string;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

export interface UseDashboardCalendar {
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
