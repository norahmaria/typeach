# Date Picker

::: info USES `Day.js`
This component uses [Day.js](https://day.js.org). Read more about using your own instance of `Day.js` with the component under the [Day.js section](#day-js).
:::

::: warning [NVDA](https://www.nvaccess.org/) REQUIRES FOCUS MODE ENABLED TO NAVIGATE AS EXPECTED
When entering a table in NVDA, it goes into a `browse` mode for most users. For a better experience, `focus` mode should be enabled.

To make users with screen readers aware of this, in the example below we use [`<PeachyVisuallyHidden />`](/components/visually-hidden) to let them know that if they're using NVDA, we recommend turning on `focus` mode.
:::

<br/>

<script lang="ts" setup>
  import DatePicker from './date-picker/DatePicker.vue'
  import './date-picker/date-picker.css'

  import DateRangePicker from './date-picker/DateRangePicker.vue'
  import './date-picker/date-range-picker.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <DatePicker />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./date-picker/DatePicker.vue#snippet
<<< ./date-picker/date-picker.css
:::

## Anatomy

```vue
<template>
  <PeachyInput.Input>
    <PeachyInput.Label />

    <PeachyDatePicker.Input>
      <!-- #before or #after-->
      <template #after>
        <PeachyDialog.Dialog>
          <PeachyDialog.Trigger />

          <PeachyDialog.Target>
            <PeachyDialog.Title />

            <PeachyDatePicker.Calendar>
              <PeachyDatePicker.Title />

              <PeachyDatePicker.Table>
                <PeachyDatePicker.Description />

                <!-- Heading row -->
                <PeachyDatePicker.Head>
                  <PeachyDatePicker.Headings>
                    <PeachyDatePicker.Heading />
                  </PeachyDatePicker.Headings>
                </PeachyDatePicker.Head>

                <!-- Rows -->
                <PeachyDatePicker.Body>
                  <PeachyDatePicker.Week>
                    <PeachyDatePicker.WeekNumber />
                    <PeachyDatePicker.Day />
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
  import { PeachyInput, PeachyDatePicker, PeachyDialog } from "typeach";
</script>
```

You can use the props `closeOnOutsideClick` and `placement` for [`<PeachyDialog.Dialog />`](/components/dialog) to make the dialog act more similar to a popover.

## Props & Emits

### `Input`

<br/>

#### Props

| Name          |           Default            |    Type     | Description                                                                                                                                                                                     |
| ------------- | :--------------------------: | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date          |                              |  `DayJs?`   |                                                                                                                                                                                                 |
| inputFormats  | `["M/D/YYYY", "MM/DD/YYYY"]` | `string[]?` | Formats allows for the input, must be a valid [Day.js formatting pattern](https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens).                                 |
| displayFormat |         `"M/D/YYYY"`         |  `string?`  | How the text in the input is formatted after date is updated, must be a valid [Day.js formatting pattern](https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens). |
| disabled      |           `false`            | `boolean?`  |                                                                                                                                                                                                 |
| readonly      |           `false`            | `boolean?`  |                                                                                                                                                                                                 |
| required      |           `false`            | `boolean?`  | The component only labels it as required with `aria-required` and does not deal with any error messages for you.                                                                                |

#### Emits

| @                | Payload  |
| ---------------- | :------: |
| update:date      | `DayJs?` |
| validate         | `DayJs?` |
| clear-validation |          |

<hr/>

### `Calendar`

::: info DISABLED OR READONLY
There is no disabled or readonly state for the `Calendar`. You're expected to disable the `<PeachyDialog.Trigger />` for both cases, as the input gives enough context
:::

The `date` here refers to the focused date, not necessarily the selected date. This is the date you should use for any navigation buttons, and for updating the title of the calendar. See [the example](#date-picker).

#### Props

| Name |  Default  |   Type   |
| ---- | :-------: | :------: |
| date | `DayJs()` | `DayJs?` |

#### Emits

| @           | Payload  |
| ----------- | :------: |
| update:date | `DayJs?` |

<hr/>

### `Day`

<br/>

#### Props

| Name     | Default |    Type    | Description                                                                                                                                                                |
| -------- | :-----: | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date     |         |  `DayJs`   |                                                                                                                                                                            |
| selected |         | `boolean?` | The calendar will deal with this for you - but if you're doing a [range date picker](#creating-a-range-date-picker) this can be used to mark additional dates as selected. |
| disabled |         | `boolean?` |                                                                                                                                                                            |

#### Emits

| @           | Payload  |
| ----------- | :------: |
| update:date | `DayJs?` |

---

## Styling

### CSS Selectors

::: info `Day` RENDERS A WRAPPER TABLE CELL
The `Day` element renders a table cell around the actual day button.
:::

Follows [our CSS classes convention](/info#styling), with some extras:

- `.peachy-date-picker__cell` for the table cell element inside `Day`.

<br />

#### State selectors

| Selector                     | Description            |  For                      |
| ---------------------------- | ---------------------- | ------------------------- |
| `[aria-pressed="<boolean>"]` | For a selected date.   | <ul><li>`Day`</li></ul>   |
| `[data-active="<boolean>"]`  | For a focused date.    | <ul><li>`Day`</li></ul>   |
| `:disabled`                  | For a disabled input.  | <ul><li>`Input`</li></ul> |
| `:read-only`                 | For a read-only input. | <ul><li>`Input`</li></ul> |

## Accessibility

Resources: [APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/), Duet's [Date Picker](https://github.com/duetds/date-picker), Deque University's [Date Picker](https://dequeuniversity.com/library/aria/date-picker) - _see below for a more comprehensive list_.

::: warning [NVDA](https://www.nvaccess.org/) REQUIRES FOCUS MODE ENABLED TO NAVIGATE AS EXPECTED
When entering a table in NVDA, it goes into `browse` mode for most users. For a better experience, `focus` mode should be enabled.

To make users with screen readers aware of this, in [the example](#date-picker) we use [`<PeachyVisuallyHidden />`](/components/visually-hidden) to let them know that if they're using NVDA, we recommend turning on `focus` mode.
:::

### Keyboard interactions

| Key                                                | Action                                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> or <kbd>↵</kbd> on a `Day`        | Selects the date.                                                                                                         |
| <kbd>→</kbd> on a `Day`                            | Moves focus to the next day.                                                                                              |
| <kbd>←</kbd> on a `Day`                            | Moves focus to the previous day..                                                                                         |
| <kbd>↓</kbd> on a `Day`                            | Moves focus to the same day of the next week.                                                                             |
| <kbd>↑</kbd> on a `Day`                            | Moves focus to the same day of the previous week.                                                                         |
| <kbd>Home</kbd> on a `Week`                        | Moves focus to the first day of the week.                                                                                 |
| <kbd>End</kbd> on a `Week`                         | Moves focus to the last day of the week.                                                                                  |
| <kbd>PageUp</kbd> on a `Week`                      | Moves focus to the same day in the previous month. If that day does not exist, moves focus to the last day of that month. |
| <kbd>PageDown</kbd> on a `Week`                    | Moves focus to the same day in the next month. If that day does not exist, moves focus to the last day of that month.     |
| <kbd>Shift</kbd> + <kbd>PageUp</kbd> on a `Week`   | Moves focus to the same day in the previous year. If that day does not exist, moves focus to the last day of that month.  |
| <kbd>Shift</kbd> + <kbd>PageDown</kbd> on a `Week` | Moves focus to the same day in the next year. If that day does not exist, moves focus to the last day of that month.      |

**Hover and keyboard interactions are synced.**

### Resources

- APG
  - [APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
  - [Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- DigitalAlly

  - [Accessible Date Pickers Roundup](https://www.digitala11y.com/accessible-date-pickers-roundup/)
  - [Grid role](https://www.digitala11y.com/grid-role/)

- [React Dates](https://github.com/react-dates/react-dates)
- Fymmot - [Inclusive Dates](https://github.com/fymmot/inclusive-dates?tab=readme-ov-file)
- WebAxe - [Accessible Date Pickers](https://www.webaxe.org/accessible-date-pickers/)
- [Keydown events are not triggered if NVDA is running](https://github.com/nvaccess/nvda/issues/15802)

## Day.js

This component uses [Day.js](https://day.js.org), with the plugins `localeData`, `weekOfYear` and `customParseFormat`.

::: warning COMPONENT DOES NOT RE-RENDER ON DAYJS CHANGES
If you make changes to dayjs dynamically (such as `locale`), you have to manually re-render your date picker wrapper component to get it to update.
:::

### If you have your own`dayjs` instance

- Add the plugins `localeData`, `weekOfYear` and `customParseFormat` to it.
- Customize our instance to match your configuration.

```ts
import { dayJs } from "typeach";

import nb from "dayjs/locale/nb";
import localeData from "dayjs/plugin/localeData";
import weekPlugin from "dayjs/plugin/weekOfYear";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";

yourDayJsInstance.locale(nb);
yourDayJsInstance.extend(localeData);
yourDayJsInstance.extend(weekPlugin);
yourDayJsInstance.extend(customParseFormatPlugin);

dayJs.locale(nb);
```

### Customizing

You can customize our `dayjs` instance as you like.

```ts
import { dayJs } from "typeach";

import nb from "dayjs/locale/nb";

dayjs.locale(nb);
```

## Creating a range date picker

<ClientOnly>
  <ComponentPreview>
    <DateRangePicker />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./date-picker/DateRangePicker.vue#snippet
<<< ./date-picker/date-range-picker.css [carousel.css (extends date-picker.css)]

:::

### Making `<DatePickerForRange />`

_The `DatePickerForRange` component above is a placeholder name for whatever you name your date picker wrapper for working with ranges, and not a component from the library._

The component has some key elements to help us out:

- a `is-for` prop to set this as "start" or "end" date picker
- a `v-model` for the date
- a `startDate` prop and an `endDate` prop

Inside our date picker for a range, we set our days to selected or not in the template using the `selected` prop, and we disable days depending on the `isFor` prop.

::: info ENSURING ATTRIBUTES STAY UP TO DATE
We're explicitly passing `startDate` and `endDate` to the functions, rather than accessing `props.startDate` and `props.endDate` _inside_ them - **this is to ensure they update when either of the values change.**
:::

```vue{8,9}
<template>
  <!-- ... -->

  <PeachyDatePicker.Day
    v-for="day in weeks[parseInt(week)]"
    :key="day.get('date')"
    :date="day"
    :selected="isSelected(day, startDate, endDate)"
    :disabled="isFor === 'start' ? isAfter(day, endDate) : isBefore(day, startDate)">
    <span aria-hidden="true">
      {{ day.format("D") }}
    </span>

    <PeachyVisuallyHidden>
      {{ day.format("D MMM YYYY") }}
    </PeachyVisuallyHidden>
  </PeachyDatePicker.Day>

  <!-- ... -->
</template>
```

And here are the functions used.

```ts
const isBefore = (date: DayJs, startDate?: DayJs) => {
  if (!startDate) {
    return false;
  }

  return date.isBefore(startDate);
};

const isAfter = (date: DayJs, endDate?: DayJs) => {
  if (!endDate) {
    return false;
  }

  return date.isAfter(endDate);
};

const isStartOrEndDate = (
  date: DayJs,
  startDate: DayJs | undefined,
  endDate: DayJs | undefined
) => {
  const formattedDate = date.format("MM/DD/YYYY");

  const formattedStartDate = startDate?.format("MM/DD/YYYY");
  const formattedEndDate = endDate?.format("MM/DD/YYYY");

  return [formattedStartDate, formattedEndDate].includes(formattedDate);
};

const isSelected = (
  date: DayJs,
  startDate: DayJs | undefined,
  endDate: DayJs | undefined
) => {
  if (isStartOrEndDate(date, startDate, endDate)) {
    return true;
  }

  if (!startDate || !endDate) {
    return false;
  }

  return date.isAfter(startDate) && date.isBefore(endDate);
};
```

### Invalid dates selected

Above we've made sure the calendar dropdown doesn't allow selecting an invalid date by disabling them. However, this does nothing to prevent the user from entering an invalid date in either of the text input.

For that case, you should provide error messages as with any other [`<Input />`](/components/input). We trigger the validation on the date picker's `Input` event `@validate` - but also whenever start or end date changes.

```ts
const validationError = ref<string | undefined>();

const validate = (date?: DayJs) => {
  if (!date) {
    validationError.value = undefined;
    return;
  }

  if (props.isFor === "start" && isAfter(date, props.endDate)) {
    validationError.value = "Can not be after end date.";
  } else if (props.isFor === "end" && isBefore(date, props.startDate)) {
    validationError.value = "Can not be before start date.";
  } else {
    validationError.value = undefined;
  }
};

watch(toRef(props, "startDate"), () => {
  if (props.isFor === "end") {
    validate(dateRef.value);
  }
});

watch(toRef(props, "endDate"), () => {
  if (props.isFor === "start") {
    validate(dateRef.value);
  }
});
```
