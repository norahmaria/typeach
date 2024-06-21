<template>
  <th :class="weekNumberClass()" scope="row">
    <slot />
  </th>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { weekNumberClass } = usePeachyClasses("datePicker", ["weekNumber"]);
</script>
