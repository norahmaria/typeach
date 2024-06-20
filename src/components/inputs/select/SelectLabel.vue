<template>
  <div :class="labelClass()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../../hooks";

  const { labelClass } = usePeachyClasses("select", ["label"]);
</script>
