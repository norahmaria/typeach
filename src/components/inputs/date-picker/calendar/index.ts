import Calendar from "./Calendar.vue";
import Title from "./CalendarTitle.vue";
import Description from "./CalendarDescription.vue";

import Table from "./CalendarTable.vue";

import Head from "./CalendarHead.vue";
import Headings from "./CalendarHeadings.vue";
import Heading from "./CalendarHeading.vue";

import Body from "./CalendarBody.vue";
import Week from "./CalendarWeek.vue";
import Day from "./CalendarDay.vue";
import WeekNumber from "./CalendarWeekNumber.vue";

export type { CalendarProps } from "./Calendar.vue";
export type { CalendarDayProps } from "./CalendarDay.vue";

export const PeachyDatePickerCalendar = {
  Calendar,

  Title,
  Table,
  Description,

  Head,
  Headings,
  Heading,

  Body,
  Week,
  WeekNumber,
  Day,
};
