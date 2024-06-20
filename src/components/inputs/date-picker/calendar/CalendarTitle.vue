<template>
  <HierarchyTitle :id="id" :class="titleClass()">
    <template #title>
      <slot />
    </template>
  </HierarchyTitle>
</template>

<script lang="ts" setup>
  import { inject, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "../../../../hooks";

  import { DatePickerCalendarContextKey } from "../context";

  import HierarchyTitle from "../../../HierarchyTitle.vue";

  export interface CalendarTitleProps {
    id?: string;
  }

  const props = withDefaults(defineProps<CalendarTitleProps>(), {
    id: () => createRandomId(),
  });

  const { titleClass } = usePeachyClasses("datePicker", ["title"]);

  const idRef = toRef(props, "id");

  const calendarContext = inject(DatePickerCalendarContextKey);

  watchImmediate(idRef, newId => {
    calendarContext?.setTitleId(newId);
  });
</script>
