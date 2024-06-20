<template>
  <button
    v-if="descriptiveText"
    :class="actionClass()"
    :aria-label="descriptiveText"
    type="button">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../hooks";

  export interface ToastActionProps {
    descriptiveText: string;
  }

  defineProps<ToastActionProps>();

  const { actionClass } = usePeachyClasses("toast", ["action"]);
</script>
