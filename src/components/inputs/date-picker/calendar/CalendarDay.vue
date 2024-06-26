<template>
  <td
    ref="tableCell"
    :class="cellClass()"
    :style="!isWithinMonth ? 'pointer-events: none;' : ''"
    :tabindex="-1"
    @focusin="onFocus">
    <!-- eslint-disable vuejs-accessibility/no-autofocus -->
    <button
      v-if="isWithinMonth"
      ref="button"
      v-bind="$attrs"
      :class="dayClass()"
      :data-active="isActive"
      :tabindex="isActive ? 0 : -1"
      :aria-pressed="selected || isSelected"
      :aria-disabled="disabled"
      :aria-current="selected || isSelected ? 'date' : undefined"
      :autofocus="isActive"
      type="button"
      @pointerenter="isWithinMonth && calendar?.setActive(date)"
      @keydown.enter="onClick"
      @keydown.space="onClick"
      @click="onClick">
      <slot />
    </button>
  </td>
</template>

<script lang="ts" setup>
  import { inject, computed, nextTick, ref, toRef } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { isSameDate, type DayJs } from "../utils";

  import { DatePickerCalendarContextKey } from "../context";

  import { watchImmediate } from "@vueuse/core";

  export interface CalendarDayProps {
    date: DayJs;

    /**
     * The calendar will deal with this for you - but if
     * you're doing a range date picker this
     * can be used to mark additional dates as selected.
     */
    selected?: boolean;

    disabled?: boolean;
  }

  const props = withDefaults(defineProps<CalendarDayProps>(), {
    disabled: false,
  });

  const { cellClass, dayClass } = usePeachyClasses("datePicker", [
    "cell",
    "day",
  ]);

  const dateRef = toRef(props, "date");

  const calendar = inject(DatePickerCalendarContextKey);

  const tableCell = ref<HTMLTableColElement>();

  const button = ref<HTMLButtonElement>();

  const isActive = computed(() => {
    return isSameDate(dateRef.value, calendar?.active.value);
  });

  const isWithinMonth = computed(() => {
    return dateRef.value.isSame(calendar?.active.value, "month");
  });

  const isSelected = computed(() => {
    return isSameDate(calendar?.selected.value, dateRef.value);
  });

  const refocus = async () => {
    if (isSameDate(calendar?.active.value, dateRef.value)) {
      await nextTick();
      tableCell.value?.focus();
    }
  };

  watchImmediate(isActive, async newIsActive => {
    if (newIsActive) {
      await nextTick();
      tableCell.value?.focus();
    }
  });

  const onFocus = async (event: FocusEvent) => {
    calendar?.setActive(dateRef.value);

    await nextTick();
    button.value?.focus();
  };

  const onClick = () => {
    if (isWithinMonth.value && !props.disabled) {
      calendar?.setSelected(dateRef.value);
    }
  };

  if (calendar) {
    watchImmediate(calendar.active, () => refocus());
  }
</script>
