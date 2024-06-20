<template>
  <legend :class="groupLabelClass()">
    <slot />
  </legend>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../../hooks";

  const { groupLabelClass } = usePeachyClasses("input", ["groupLabel"]);
</script>
