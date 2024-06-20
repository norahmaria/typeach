<template>
  <tr :class="headingsClass()">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../../../hooks";

  const { headingsClass } = usePeachyClasses("datePicker", ["headings"]);
</script>
