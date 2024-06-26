<!-- #region snippet -->
<template>
  <PeachyInput.Group>
    <PeachyInput.GroupLabel>Select a range</PeachyInput.GroupLabel>

    <div class="date-range-picker-wrapper">
      <DatePickerForRange
        v-model:date="startDate"
        :end-date="endDate"
        :start-date="startDate"
        is-for="start"
        label="Start date"
        description="Pick a start date."
        @update:date="startDate = $event" />

      <div class="date-range-arrow-wrapper">
        <LongArrowSvg aria-hidden class="arrow" />
      </div>

      <DatePickerForRange
        v-model:date="endDate"
        :end-date="endDate"
        :start-date="startDate"
        is-for="end"
        label="End date"
        description="Pick an end date." />
    </div>
  </PeachyInput.Group>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput, type DayJs } from "@/index";

  import DatePickerForRange from "./DatePickerForRange.vue";

  import LongArrowSvg from "./LongArrowSvg.vue";

  const startDate = ref<DayJs>();

  const endDate = ref<DayJs>();
</script>
