<template>
  <legend :class="inputLabelClass()">
    <slot />
  </legend>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { inputLabelClass } = usePeachyClasses("radio", ["inputLabel"]);
</script>
