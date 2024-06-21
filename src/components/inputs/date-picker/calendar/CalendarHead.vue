<template>
  <thead :class="headClass()">
    <slot />
  </thead>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { headClass } = usePeachyClasses("datePicker", ["head"]);
</script>
