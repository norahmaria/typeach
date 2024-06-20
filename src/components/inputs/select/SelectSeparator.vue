<template>
  <component
    :is="is"
    :class="separatorClass()"
    role="separator"
    aria-hidden="true"
    aria-orientation="horizontal" />
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../../hooks";

  export interface SelectSeparatorProps {
    is?: string;
  }

  withDefaults(defineProps<SelectSeparatorProps>(), {
    is: "hr",
  });

  const { separatorClass } = usePeachyClasses("select", ["separator"]);
</script>
