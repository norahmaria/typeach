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
            <unicon name="schedule" />
          </PeachyDialog.Trigger>

          <PeachyDialog.Target close-on-outside-click placement="bottom">
            <PeachyVisuallyHidden>
              <PeachyDialog.Title>Date picker</PeachyDialog.Title>
            </PeachyVisuallyHidden>

            <PeachyDatePicker.Calendar
              v-model:date="focusedDate"
              v-slot="{ weeks, headings }">
              <div class="date-picker-navigation-wrapper">
                <button
                  aria-label="Previous month"
                  @click="focusedDate = focusedDate.add(-1, 'months')">
                  <unicon name="angle-left" />
                </button>

                <PeachyDatePicker.Title>
                  {{ capitalize(focusedDate?.format("MMMM YYYY")) }}
                </PeachyDatePicker.Title>

                <button
                  aria-label="Next month"
                  @click="focusedDate = focusedDate.add(1, 'months')">
                  <unicon name="angle-right" />
                </button>
              </div>

              <PeachyDatePicker.Table>
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
        </PeachyDialog.Dialog>
      </template>
    </PeachyDatePicker.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import {
    dayJs,
    PeachyDatePicker,
    PeachyDialog,
    PeachyVisuallyHidden,
    PeachyInput,
    type DayJs,
  } from "typeach";

  const emit = defineEmits<{
    "update:date": [date: DayJs | undefined];
  }>();

  const selectedDate = ref<DayJs>();

  const focusedDate = ref(dayJs());

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  watchImmediate(selectedDate, newSelectedDate => {
    emit("update:date", newSelectedDate);
  });
</script>

<style src="./date-picker.css" />
