<!-- #region snippet -->
<template>
  <PeachyInput.Input class="date">
    <PeachyDatePicker.Input
      v-bind="$attrs"
      v-model:date="selectedDate"
      placeholder="M/D/YYYY">
      <template #before>
        <PeachyInput.Label>Date</PeachyInput.Label>
      </template>

      <template #after>
        <PeachyDialog.Dialog>
          <PeachyDialog.Trigger toggle aria-label="Pick date">
            Calendar
          </PeachyDialog.Trigger>

          <Teleport to="body">
            <PeachyDialog.Target close-on-outside-click>
              <PeachyVisuallyHidden>
                <PeachyDialog.Title>Date picker</PeachyDialog.Title>
              </PeachyVisuallyHidden>

              <PeachyDatePicker.Calendar
                v-model:date="focusedDate"
                v-slot="{ weeks, headings }">
                <PeachyDatePicker.Title id="calendar-title">
                  {{ capitalize(focusedDate?.format("MMMM YYYY")) }}
                </PeachyDatePicker.Title>

                <PeachyDatePicker.Table id="calendar">
                  <PeachyDatePicker.Description>
                    <PeachyVisuallyHidden is="span">
                      If using NVDA, enter focus mode to navigate the dates as
                      intended.
                    </PeachyVisuallyHidden>

                    Pick a date for your reservation.
                  </PeachyDatePicker.Description>

                  <PeachyDatePicker.Head>
                    <PeachyDatePicker.Headings>
                      <td></td>

                      <PeachyDatePicker.Heading
                        v-for="day in headings"
                        :key="day">
                        {{ day.substring(0, 2).toUpperCase() }}
                      </PeachyDatePicker.Heading>
                    </PeachyDatePicker.Headings>
                  </PeachyDatePicker.Head>

                  <PeachyDatePicker.Body>
                    <PeachyDatePicker.Week
                      v-for="week in Object.keys(weeks)"
                      :key="week">
                      <PeachyDatePicker.WeekNumber>
                        {{ week }}
                      </PeachyDatePicker.WeekNumber>

                      <PeachyDatePicker.Day
                        v-for="day in weeks[parseInt(week)]"
                        :key="day.get('date')"
                        :date="day">
                        <span aria-hidden="true">
                          {{ day.format("D") }}
                        </span>

                        <PeachyVisuallyHidden>
                          {{ day.format("D MMM YYYY") }}
                        </PeachyVisuallyHidden>
                      </PeachyDatePicker.Day>
                    </PeachyDatePicker.Week>
                  </PeachyDatePicker.Body>
                </PeachyDatePicker.Table>
              </PeachyDatePicker.Calendar>
            </PeachyDialog.Target>
          </Teleport>
        </PeachyDialog.Dialog>
      </template>
    </PeachyDatePicker.Input>
  </PeachyInput.Input>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { dayJs, type DayJs } from "../utils";

  import {
    PeachyDatePicker,
    PeachyDialog,
    PeachyVisuallyHidden,
    PeachyInput,
  } from "../../../";

  const emit = defineEmits<{
    "update:date": [date: DayJs | undefined];
  }>();

  const selectedDate = ref<DayJs>();

  const focusedDate = ref(dayJs(new Date("12 December, 2023")));

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  watchImmediate(selectedDate, newSelectedDate => {
    emit("update:date", newSelectedDate);
  });
</script>
