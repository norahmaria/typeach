<template>
  <th :class="headingClass()" scope="col">
    <slot />
  </th>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../../../hooks";

  const { headingClass } = usePeachyClasses("datePicker", ["heading"]);
</script>
