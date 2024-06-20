<template>
  <slot name="before" />

  <fieldset
    ref="item"
    v-memo="[$attrs]"
    v-bind="$attrs"
    :class="inputClass()"
    @focusout="onFocusOut">
    <slot />
  </fieldset>

  <slot name="after" />
</template>

<script lang="ts" setup>
  import { provide, readonly, ref, toRef, watch } from "vue";

  import { createRandomId, usePeachyClasses, useInput } from "../../../hooks";

  import { RadioGroupContextKey, type RadioGroupContext } from "./context";
  import { watchImmediate } from "@vueuse/core";

  export interface RadioInputProps {
    selected: string;
    disabled?: boolean;
    readOnly?: boolean;
    id?: string;
  }

  const props = withDefaults(defineProps<RadioInputProps>(), {
    id: () => createRandomId(),
    disabled: false,
    readOnly: false,
  });

  const emit = defineEmits<{
    "update:selected": [value: string];
    validate: [value: string];
    "clear-validation": [];
  }>();

  const { inputClass } = usePeachyClasses("radio", ["input"]);

  const item = ref<HTMLFieldSetElement>();

  const selectedRef = toRef(props, "selected");

  const internalSelected = ref(props.selected);

  const input = useInput(toRef(props, "id"), internalSelected, emit, {
    isSame(oldValue, newValue) {
      return oldValue !== newValue;
    },
  });

  const onFocusOut = () => {
    if (!item.value) {
      return;
    }

    setTimeout(() => {
      const inputsCollection = item.value!.querySelectorAll(
        "input[type='radio']"
      );

      const inputs = Array.from(inputsCollection);

      if (inputs.every(input => !input.matches(":focus"))) {
        input.validate();
      } else {
        input.clearErrors();
      }
    }, 0);
  };

  watchImmediate(selectedRef, newSelected => {
    internalSelected.value = newSelected;
  });

  watch(internalSelected, newSelected => {
    emit("update:selected", newSelected);
  });

  provide<RadioGroupContext>(RadioGroupContextKey, {
    disabled: props.disabled,
    readOnly: props.readOnly,

    selected: readonly(internalSelected),

    setSelected(value) {
      internalSelected.value = value;
    },
  });
</script>
