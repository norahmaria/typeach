<template>
  <slot name="before" />

  <component
    v-bind="$attrs"
    :is="textarea ? 'textarea' : 'input'"
    :id="id"
    v-memo="[
      $attrs,
      id,
      props.textarea,
      textarea,
      required,
      placeholder,
      internalValue,
    ]"
    :data-textarea="textarea"
    :aria-required="required"
    :placeholder="placeholder"
    :value="internalValue"
    :class="inputClass()"
    type="text"
    @change="onChange"
    @blur="input.validate"
    @input="input.clearErrors" />

  <slot name="after" />
</template>

<script lang="ts" setup>
  import { ref, watch, toRef } from "vue";

  import { createRandomId, usePeachyClasses, useInput } from "@/hooks";

  import { isHtmlElement } from "@/hooks/utils";

  import { isTextInput } from "../utils";

  export interface TextInputProps {
    id?: string;
    value?: string;
    textarea?: boolean;
    placeholder: string;

    /**
     * The component only labels it as required with
     * `aria-required` and does not deal with any error messages for you.
     */
    required?: boolean;
  }

  const props = withDefaults(defineProps<TextInputProps>(), {
    id: () => createRandomId(),
    value: "",
    textarea: false,
  });

  const emit = defineEmits<{
    "update:value": [value: string];

    /**
     * Only triggers if part of an Input.
     */
    "clear-validation": [];

    /**
     * Only triggers if part of an Input.
     */
    validate: [value: string];
  }>();

  const { inputClass } = usePeachyClasses("textInput", ["input"]);

  const internalValue = ref<string>(props.value);

  const input = useInput(toRef(props, "id"), internalValue, emit, {
    isSame(oldValue, newValue) {
      return oldValue === newValue;
    },
  });

  watch(toRef(props, "value"), newValue => {
    internalValue.value = newValue ?? "";
  });

  watch(internalValue, newValue => {
    emit("update:value", newValue);
  });

  const onChange = (event: Event) => {
    if (isHtmlElement(event.target) && isTextInput(event.target)) {
      internalValue.value = event.target.value;
    }
  };
</script>
