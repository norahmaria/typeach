<template>
  <div v-if="hide" :style="style">
    <slot />
  </div>

  <slot v-else />
</template>

<script lang="ts" setup>
  import type { CSSProperties } from "vue";

  export interface VisuallyHiddenProps {
    /**
     * Let's you turn off the
     * visually hidden css.
     */
    hide?: boolean;
  }

  withDefaults(defineProps<VisuallyHiddenProps>(), {
    hide: true,
  });

  const style: CSSProperties = {
    "white-space": "nowrap",
    "clip-path": "inset(50%)",
    clip: "rect(0 0 0 0)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    width: "1px",
  };
</script>
