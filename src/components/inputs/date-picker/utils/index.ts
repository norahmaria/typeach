import dayjs, { type Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekPlugin from "dayjs/plugin/weekOfYear";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";

dayjs.extend(localeData);
dayjs.extend(weekPlugin);
dayjs.extend(customParseFormatPlugin);

export type DayJs = Dayjs;

export const dayJs = dayjs;

export const isSameDate = (
  comparer: DayJs | undefined,
  comparee: DayJs | undefined
) => {
  if ((!comparer && comparee) || (!comparee && comparer)) {
    return false;
  }

  if (!comparer) {
    return false;
  }

  return (
    comparer.isSame(comparee, "date") &&
    comparer.isSame(comparee, "month") &&
    comparer.isSame(comparee, "year")
  );
};

export const getDatesWithinMonth = (date: DayJs) => {
  const firstDate = date.startOf("month");

  const dates: DayJs[] = [];

  let currentDate = firstDate;

  while (currentDate.get("month") === firstDate.get("month")) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, "day");
  }

  return dates;
};

export const getWeekdaysInOrder = (weeks: Record<number, Dayjs[]>) => {
  const weekNumbers = Object.keys(weeks).map(key => parseInt(key));

  const firstWeek = weeks[Math.min(...weekNumbers)];

  return firstWeek?.map(week => week.format("dddd"));
};

/* eslint-disable-next-line complexity */
export const groupDatesByWeek = (dates: DayJs[]) => {
  const month = dates[0]?.get("month");

  const weeks = Object.groupBy(dates, date => date.week());

  const weekNumbers = Object.keys(weeks)
    .map(key => parseInt(key))
    .sort((a, b) => a - b);

  const firstWeek = Math.min(...weekNumbers);
  const lastWeek = Math.min(...weekNumbers);

  for (const weekNumber of weekNumbers) {
    const days = weeks[weekNumber]!;

    if (![11, 0].includes(month ?? -1)) {
      if (weekNumber === firstWeek) {
        weeks[weekNumber] = fillDatesBefore(days);
      } else if (weekNumber === lastWeek) {
        weeks[weekNumber] = fillDatesAfter(days);
      }

      continue;
    }

    if (month === 11 && days.length !== 7) {
      const nextMinWeek = Math.min(
        ...weekNumbers.filter(week => {
          return week !== 1;
        })
      );

      const lastWeek = Math.max(
        ...weekNumbers.filter(week => {
          return week !== 1;
        })
      );

      if (weekNumber === 1) {
        weeks[lastWeek + 1] = fillDatesAfter(days);
        delete weeks[weekNumber];
      } else if (weekNumber === nextMinWeek) {
        weeks[weekNumber] = fillDatesBefore(days);
      } else if (weekNumber === Math.max(...weekNumbers)) {
        weeks[weekNumber] = fillDatesAfter(days);
      }
    }

    if (month === 0 && days.length !== 7) {
      const nextMaxWeek = Math.max(
        ...weekNumbers.filter(week => {
          return week !== 52 && week !== 53;
        })
      );

      if ([52, 53].includes(weekNumber)) {
        weeks[0] = fillDatesBefore(days);
        delete weeks[weekNumber];
      } else if (weekNumber === nextMaxWeek) {
        weeks[weekNumber] = fillDatesAfter(days);
      } else if (weekNumber === Math.min(...weekNumbers)) {
        weeks[weekNumber] = fillDatesBefore(days);
      }
    }
  }

  const weeksSorted: Record<number, DayJs[]> = {};

  const updatedSortedKeys = Object.keys(weeks)
    .map(key => parseInt(key))
    .sort((a, b) => a - b);

  for (const week of updatedSortedKeys) {
    weeksSorted[week] = weeks[week]!;
  }

  return weeksSorted;
};

const fillDatesAfter = (dates: DayJs[]) => {
  const sortedDates = dates.toSorted((a, b) => a.get("date") - b.get("date"));

  while (sortedDates.length != 7) {
    sortedDates.push(sortedDates[sortedDates.length - 1]!.add(1, "day"));
  }

  return sortedDates;
};

const fillDatesBefore = (dates: DayJs[]) => {
  const sortedDates = dates.toSorted((a, b) => a.get("date") - b.get("date"));

  while (sortedDates.length != 7) {
    sortedDates.unshift(sortedDates[0]!.add(-1, "day"));
  }

  return sortedDates;
};
