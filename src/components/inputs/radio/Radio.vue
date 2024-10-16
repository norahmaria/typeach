<template>
  <slot name="before" />

  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input
    :id="id"
    :class="radioClass()"
    :checked="value === unref(radioGroup?.selected)"
    :disabled="disabled || radioGroup?.disabled"
    :aria-disabled="readOnly || radioGroup?.readOnly"
    :data-readonly="readOnly || radioGroup?.readOnly"
    type="radio"
    @click="onClick"
    @change="radioGroup?.setSelected(value)" />

  <slot name="after" />
</template>

<script lang="ts" setup>
  import { inject, unref, provide, toRef, computed } from "vue";

  import { createRandomId, usePeachyClasses } from "@/hooks";

  import {
    RadioContextKey,
    RadioGroupContextKey,
    type RadioGroupContext,
  } from "./context";

  export interface RadioProps {
    id?: string;
    disabled?: boolean;
    readOnly?: boolean;
    value: string;
  }

  const props = withDefaults(defineProps<RadioProps>(), {
    id: () => createRandomId(),
    disabled: false,
    readOnly: false,
  });

  const { radioClass } = usePeachyClasses("radio");

  const valueRef = toRef(props, "value");

  const radioGroup = inject<RadioGroupContext>(RadioGroupContextKey);

  provide(RadioContextKey, {
    selected: computed(() => valueRef.value === radioGroup?.selected.value),
    id: toRef(props, "id"),

    onClick() {
      radioGroup?.setSelected(props.value);
    },
  });

  const onClick = (event: MouseEvent) => {
    if (
      props.disabled ||
      radioGroup?.disabled ||
      props.readOnly ||
      radioGroup?.readOnly
    ) {
      event.preventDefault();
    }
  };
</script>
