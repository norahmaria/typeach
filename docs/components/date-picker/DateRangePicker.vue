<!-- #region snippet -->
<template>
  <PeachyInput.Group>
    <PeachyInput.GroupLabel>Select a range</PeachyInput.GroupLabel>

    <div class="date-range-picker-wrapper">
      <DatePickerWrapper
        v-model:date="startDate"
        :end-date="endDate"
        :start-date="startDate"
        label="Start date"
        description="Pick a start date."
        @update:date="startDate = $event" />

      <div class="date-range-arrow-wrapper">
        <LongArrowSvg aria-hidden class="arrow" />
      </div>

      <DatePickerWrapper
        v-model:date="endDate"
        :end-date="endDate"
        :start-date="startDate"
        label="End date"
        description="Pick an end date." />
    </div>
  </PeachyInput.Group>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { watch, ref } from "vue";

  import type { DayJs } from "../../../src/components/inputs/date-picker/utils";
  import { PeachyInput } from "../../../src";

  import DatePickerWrapper from "./DatePickerForRange.vue";

  import LongArrowSvg from "./LongArrowSvg.vue";

  const startDate = ref<DayJs>();
  const endDate = ref<DayJs>();

  watch(startDate, newStartDate => {
    if (!endDate.value || !newStartDate) {
      return;
    }

    if (newStartDate.isAfter(endDate.value)) {
      endDate.value = undefined;
    }
  });

  watch(endDate, newEndDate => {
    if (!startDate.value || !newEndDate) {
      return;
    }

    if (newEndDate.isBefore(startDate.value)) {
      startDate.value = undefined;
    }
  });
</script>
