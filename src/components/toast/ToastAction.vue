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
  import { usePeachyClasses } from "@/hooks";

  export interface ToastActionProps {
    /**
     * A description describing an alternative route
     * for performing this action if they are
     * not able to reach the toast in time.
     */
    descriptiveText: string;
  }

  defineProps<ToastActionProps>();

  const { actionClass } = usePeachyClasses("toast", ["action"]);
</script>
