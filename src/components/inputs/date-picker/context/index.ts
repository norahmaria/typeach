import type { DeepReadonly, InjectionKey, Ref } from "vue";
import type { DayJs } from "../utils";

export type DatePickerContext = {
  date: DeepReadonly<Ref<DayJs | undefined>>;
  setDate(date: DayJs): void;
};

export const DatePickerContextKey: InjectionKey<DatePickerContext> =
  Symbol("peachy-date-picker");

export type DatePickerCalendarContext = {
  selected: Ref<DayJs | undefined>;
  active: Ref<DayJs>;
  weeks: Ref<Partial<Record<number, DayJs[]>>>;

  titleId: Ref<string | undefined>;
  setTitleId(id: string): void;

  setSelected(day: DayJs): void;
  setActive(day: DayJs): void;
};

export const DatePickerCalendarContextKey: InjectionKey<DatePickerCalendarContext> =
  Symbol("peachy-date-picker-calendar");
