<template>
  <div
    :class="progressClass()"
    :aria-valuenow="value"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-labelledby="labelId"
    :aria-label="labelId ? undefined : `${Math.round((value / max) * 100)}%`"
    role="progressbar">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { provide, ref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { ProgressContextKey } from "./context";

  export interface ProgressProps {
    /**
     * The value of the progress indicator,
     * must be above the `min` value and below the `max` value.
     */
    value: number;

    /**
     * The min value.
     * @default 0
     */
    min?: number;

    /**
     * The max value.
     * @default 100
     */
    max?: number;
  }

  withDefaults(defineProps<ProgressProps>(), {
    min: 0,
    max: 100,
  });

  const { progressClass } = usePeachyClasses("progress");

  const labelId = ref<string | undefined>();

  provide(ProgressContextKey, {
    setLabelId(id) {
      labelId.value = id;
    },
  });
</script>
