<template>
  <Page :title="title" is-input description="A text-input and a pop up table">
    <template #preview>
      <div class="note note--info">
        <div class="note__title">
          Uses
          <a href="https://day.js.org">Day.js</a>
        </div>

        <p>
          This component uses
          <a href="https://day.js.org">Day.js</a>
          .
        </p>
      </div>

      <div class="note note--warning">
        <div class="note__title">
          In
          <a href="https://www.nvaccess.org/">NVDA</a>
          focus mode is recommended.
        </div>

        <p>
          When entering a table in NVDA, it goes into a browse mode for most
          users. For a better experience, focus mode should be enabled.
        </p>

        <p>
          To make users with screen readers aware of this, in the example below
          we use some
          <RouterLink :to="{ name: 'visually-hidden' }">
            visually hidden text
          </RouterLink>
          to let them know that if they're using NVDA, we recommend turning on
          focus mode.
        </p>
      </div>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <DatePickerExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="inputMeta" title="Input" />

      <ComponentApi :meta="calendarMeta" title="Calendar">
        <p>
          There is no
          <code>disabled</code>
          or
          <code>readonly</code>
          state for the calendar, you're expected to disable the trigger for
          both cases, as the input provides enough information.
        </p>
      </ComponentApi>

      <ComponentApi :meta="calendarTitleMeta" title="Title" />
      <ComponentApi :meta="calendarTableMeta" title="Table" />
      <ComponentApi :meta="calendarDescriptionMeta" title="Description" />
      <ComponentApi :meta="calendarHeadMeta" title="Head" />
      <ComponentApi :meta="calendarHeadingsMeta" title="Headings" />
      <ComponentApi :meta="calendarHeadingMeta" title="Heading" />
      <ComponentApi :meta="calendarBodyMeta" title="Body" />
      <ComponentApi :meta="calendarWeekMeta" title="Week" />
      <ComponentApi :meta="calendarWeekNumberMeta" title="Week Number" />
      <ComponentApi :meta="calendarDayMeta" title="Day" />
    </template>

    <template #styling>
      <StylingContent />
    </template>

    <template #accessibility>
      <AccessibilityContent />
    </template>

    <template #resources>
      <ResourcesContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "@docs/components/Page.vue";
  import ComponentPreview from "@docs/components/ComponentPreview.vue";
  import ComponentApi from "@docs/components/ComponentApi.vue";

  import DatePickerExample from "./DatePicker.example.vue";

  import AnatomyContent from "./markdown/date-picker-anatomy.md";
  import StylingContent from "./markdown/date-picker-styling.md";
  import AccessibilityContent from "./markdown/date-picker-accessibility.md";
  import ResourcesContent from "./markdown/date-picker-resources.md";

  import SFC from "./DatePicker.example.vue?raw";
  import CSS from "./date-picker.css?raw";

  import inputMeta from "../DatePickerInput.vue?types";
  import calendarMeta from "../calendar/Calendar.vue?types";
  import calendarBodyMeta from "../calendar/CalendarBody.vue?types";
  import calendarDayMeta from "../calendar/CalendarDay.vue?types";
  import calendarDescriptionMeta from "../calendar/CalendarDescription.vue?types";
  import calendarHeadMeta from "../calendar/CalendarHead.vue?types";
  import calendarHeadingMeta from "../calendar/CalendarHeading.vue?types";
  import calendarHeadingsMeta from "../calendar/CalendarHeadings.vue?types";
  import calendarTableMeta from "../calendar/CalendarTable.vue?types";
  import calendarTitleMeta from "../calendar/CalendarTitle.vue?types";
  import calendarWeekMeta from "../calendar/CalendarWeek.vue?types";
  import calendarWeekNumberMeta from "../calendar/CalendarWeekNumber.vue?types";

  const title = "Date Picker";
</script>
