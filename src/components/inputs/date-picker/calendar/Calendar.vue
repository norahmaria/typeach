<template>
  <slot :weeks="weeks" :dates="dates" :headings="weekdays" :date="date" />
</template>

<script lang="ts" setup>
  import { computed, inject, provide, ref, toRef, watch } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import {
    dayJs,
    getDatesWithinMonth,
    groupDatesByWeek,
    getWeekdaysInOrder,
    type DayJs,
  } from "../utils";

  import {
    DatePickerContextKey,
    DatePickerCalendarContextKey,
  } from "../context";

  import {
    DialogContextKey,
    type DialogContext,
  } from "../../../../components/dialog/context";

  export interface CalendarProps {
    date?: DayJs;
  }

  const props = withDefaults(defineProps<CalendarProps>(), {
    date: () => dayJs(),
  });

  const emit = defineEmits<{
    "update:date": [date: DayJs];
  }>();

  const dialog = inject<DialogContext>(DialogContextKey);

  const dateInput = inject(DatePickerContextKey, undefined);

  const selectedDateRef = ref(dateInput?.date.value);

  const internalDate = ref(selectedDateRef.value ?? props.date);

  const dates = ref<DayJs[]>([]);

  const weeks = ref<Record<number, DayJs[]>>({});

  const weekdays = computed(() => getWeekdaysInOrder(weeks.value));

  const titleId = ref<string>();

  watch(selectedDateRef, newSelectedDate => {
    if (newSelectedDate) {
      dateInput?.setDate(newSelectedDate);
      internalDate.value = newSelectedDate;
    }
  });

  watch(internalDate, newDate => {
    emit("update:date", newDate);
  });

  watchImmediate(toRef(props, "date"), newDate => {
    internalDate.value = newDate;
  });

  watchImmediate(internalDate, (newDate, previousDate) => {
    if (
      !newDate.isSame(previousDate, "month") ||
      !newDate.isSame(previousDate, "year") ||
      !previousDate
    ) {
      dates.value = getDatesWithinMonth(newDate);
      weeks.value = groupDatesByWeek(dates.value);
    }
  });

  if (dateInput) {
    watchImmediate(dateInput.date, newDate => {
      selectedDateRef.value = newDate;

      if (newDate) {
        internalDate.value = newDate;
      }
    });
  }

  provide(DatePickerCalendarContextKey, {
    selected: selectedDateRef,
    active: internalDate,
    weeks,

    titleId,

    setTitleId(id) {
      titleId.value = id;
    },

    setSelected(day) {
      selectedDateRef.value = day;
      dialog?.close();
    },

    setActive(day) {
      internalDate.value = day;
    },
  });
</script>
