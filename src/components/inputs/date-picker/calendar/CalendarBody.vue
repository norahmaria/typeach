<template>
  <tbody :class="bodyClass()">
    <slot />
  </tbody>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { bodyClass } = usePeachyClasses("datePicker", ["body"]);
</script>
