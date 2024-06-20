import Input from "./DatePickerInput.vue";

import { PeachyDatePickerCalendar } from "./calendar";

export { dayJs, type DayJs, isSameDate } from "./utils";

export type { CalendarProps, CalendarDayProps as DayProps } from "./calendar";

export type { DatePickerProps } from "./DatePickerInput.vue";

export const PeachyDatePicker = {
  Input,
  ...PeachyDatePickerCalendar,
};
