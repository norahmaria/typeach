<template>
  <component :is="is" :class="inputClass()">
    <slot />
  </component>
</template>

<script lang="ts" generic="T" setup>
  import { usePeachyClasses } from "@/hooks";

  export interface InputProps {
    is?: string;
  }

  withDefaults(defineProps<InputProps>(), {
    is: "div",
  });

  const { inputClass } = usePeachyClasses("input");
</script>
