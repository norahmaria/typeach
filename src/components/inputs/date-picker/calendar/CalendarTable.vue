<template>
  <table
    :aria-labelledby="unref(calendarContext?.titleId)"
    :class="tableClass()">
    <slot />
  </table>
</template>

<script lang="ts" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses } from "../../../../hooks";

  import { DatePickerCalendarContextKey } from "../context";

  const { tableClass } = usePeachyClasses("datePicker", ["table"]);

  const calendarContext = inject(DatePickerCalendarContextKey);
</script>
