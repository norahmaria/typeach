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

  import {
    createRandomId,
    isHtmlElement,
    usePeachyClasses,
    useInput,
  } from "../../../hooks";

  import { isTextInput } from "../utils";

  export interface TextInputProps {
    id?: string;
    value?: string;
    textarea?: boolean;
    placeholder: string;
    required?: boolean;
  }

  const props = withDefaults(defineProps<TextInputProps>(), {
    id: () => createRandomId(),
    value: "",
    textarea: false,
  });

  const emit = defineEmits<{
    "clear-validation": [];
    "update:value": [value: string];
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
