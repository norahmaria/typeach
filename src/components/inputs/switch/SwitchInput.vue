<template>
  <button
    :id="id"
    :class="inputClass()"
    :aria-pressed="internalValue"
    :aria-disabled="readonly"
    :aria-required="true"
    type="button"
    @click="onClick">
    <slot :on="on" />
  </button>
</template>

<script lang="ts" setup>
  import { ref, watch, toRef } from "vue";

  import { createRandomId, usePeachyClasses, useInput } from "../../../hooks";

  export interface SwitchProps {
    on?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
  }

  const props = withDefaults(defineProps<SwitchProps>(), {
    id: () => createRandomId(),
    on: false,
    required: false,
    readonly: false,
  });

  const emit = defineEmits<{
    "update:on": [on: boolean];
    validate: [on: boolean];
    "clear-validation": [];
  }>();

  const { inputClass } = usePeachyClasses("switch", ["input"]);

  const internalValue = ref(props.on);

  const input = useInput(toRef(props, "id"), internalValue, emit, {
    isSame(oldValue, newValue) {
      return oldValue !== newValue;
    },
  });

  watch(toRef(props, "on"), newOn => {
    internalValue.value = newOn;
  });

  watch(internalValue, newValue => {
    emit("update:on", newValue);
  });

  const onClick = (event: MouseEvent) => {
    if (props.readonly) {
      event.preventDefault();
      return;
    }

    internalValue.value = !internalValue.value;
    input.validate();
  };
</script>
