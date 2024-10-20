<template>
  <button
    :id="id"
    :class="inputClass()"
    :aria-pressed="internalValue"
    :aria-disabled="readonly"
    :aria-required="true"
    :disabled="disabled"
    type="button"
    @click="onClick">
    <slot :on="on" />
  </button>
</template>

<script lang="ts" setup>
  import { ref, watch, toRef } from "vue";

  import { createRandomId, usePeachyClasses, useInput } from "@/hooks";

  export interface SwitchProps {
    id?: string;
    on?: boolean;
    readonly?: boolean;
    disabled?: boolean;

    /**
     * The component only labels it as required with
     * `aria-required` and does not deal with any error messages for you.
     */
    required?: boolean;
  }

  const props = withDefaults(defineProps<SwitchProps>(), {
    id: () => createRandomId(),
    on: false,
    readonly: false,
    disabled: false,
    required: false,
  });

  const emit = defineEmits<{
    "update:on": [on: boolean];

    /**
     * Only triggers if part of an Input.
     */ validate: [on: boolean];

    /**
     * Only triggers if part of an Input.
     */ "clear-validation": [];
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
