<template>
  <component
    :is="is"
    :class="separatorClass()"
    role="separator"
    aria-hidden="true"
    aria-orientation="horizontal" />
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  export interface MenuSeparatorProps {
    /**
     * The `is` attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).
     */
    is?: string;
  }

  withDefaults(defineProps<MenuSeparatorProps>(), {
    is: "hr",
  });

  const { separatorClass } = usePeachyClasses("menu", ["separator"]);
</script>
