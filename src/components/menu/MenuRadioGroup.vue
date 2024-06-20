<template>
  <slot />
</template>

<script lang="ts" generic="T" setup>
  import { provide, readonly, toRef } from "vue";

  import { MenuRadioGroupContextKey } from "./context";

  export interface MenuRadioGroupProps<V> {
    value: V;
  }

  const props = defineProps<MenuRadioGroupProps<T>>();

  const emit = defineEmits<{
    "update:value": [value: T];
  }>();

  provide(MenuRadioGroupContextKey, {
    value: readonly(toRef(props, "value")),

    onRadioClick: value => emit("update:value", value),
  });
</script>
