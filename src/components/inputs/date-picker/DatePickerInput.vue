<template>
  <slot name="before" />

  <input
    v-bind="$attrs"
    :id="id"
    v-memo="[$attrs, id, unref(inputValue), required]"
    :value="unref(inputValue)"
    :class="inputClass()"
    :aria-required="required"
    :disabled="disabled"
    :readonly="readOnly"
    type="text"
    @change="onChange"
    @input="input.clearErrors" />

  <slot name="after" />
</template>

<script lang="ts" setup>
  import { ref, watch, toRef, readonly, provide, unref, computed } from "vue";

  import { createRandomId, usePeachyClasses, useInput } from "@/hooks";

  import { isTextInput } from "../utils";

  import { dayJs, type DayJs, isSameDate } from "./utils";

  import { DatePickerContextKey } from "./context";

  export interface DatePickerProps {
    id?: string;
    date?: DayJs;
    readOnly?: boolean;
    disabled?: boolean;

    /**
     * The component only labels it as required with `aria-required`
     * and does not deal with any error messages for you.
     */
    required?: boolean;

    /**
     * Formats allows for the input,
     * must be a valid [Day.js formatting pattern](https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens).
     */
    inputFormats?: string[];

    /**
     * How the text in the input is formatted after date is updated,
     * must be a valid [Day.js formatting pattern](https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens).
     */
    displayFormat?: string;
  }

  const props = withDefaults(defineProps<DatePickerProps>(), {
    id: () => createRandomId(),
    inputFormats: () => ["M/D/YYYY", "MM/DD/YYYY"],
    displayFormat: "M/D/YYYY",
    date: undefined,
    readOnly: false,
    disabled: false,
  });

  const emit = defineEmits<{
    "update:date": [value: DayJs | undefined];

    /**
     * Only triggers if part of an Input.
     */
    validate: [value: DayJs | undefined];

    /**
     * Only triggers if part of an Input.
     */
    "clear-validation": [];
  }>();

  const { inputClass } = usePeachyClasses("datePicker", ["input"]);

  const idRef = toRef(props, "id");

  const dateRef = toRef(props, "date");

  const displayFormatRef = toRef(props, "displayFormat");

  const internalDate = ref<DayJs | undefined>(props.date);

  const input = useInput(idRef, internalDate, emit, {
    isSame: isSameDate,
  });

  const textInput = ref<string>("");

  const inputValue = computed(() => {
    return internalDate.value?.isValid()
      ? internalDate.value.format(displayFormatRef.value)
      : textInput;
  });

  watch(dateRef, (newValue, oldValue) => {
    if (!isSameDate(newValue, oldValue)) {
      internalDate.value = newValue;
    }
  });

  watch(internalDate, (newValue, oldValue) => {
    emit("update:date", newValue);
    input.validate();
  });

  const onChange = (event: Event) => {
    if (!isTextInput(event.target)) {
      return;
    }

    textInput.value = event.target.value.trim();

    const newDate = dayJs(textInput.value, props.inputFormats, true);

    if (newDate.isValid()) {
      internalDate.value = newDate;
    } else {
      internalDate.value = undefined;
    }

    input.validateWithValue(newDate);
  };

  provide(DatePickerContextKey, {
    date: readonly(internalDate),

    setDate(date) {
      if (!isSameDate(date, internalDate.value)) {
        input.clearErrors();
        internalDate.value = date;
      }
    },
  });
</script>
