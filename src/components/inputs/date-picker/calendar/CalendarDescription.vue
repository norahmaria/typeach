<template>
  <caption :class="descriptionClass()">
    <slot />
  </caption>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { descriptionClass } = usePeachyClasses("datePicker", ["description"]);
</script>
