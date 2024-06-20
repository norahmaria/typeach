<template>
  <li :class="labelClass()">
    <slot />
  </li>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../hooks";

  const { labelClass } = usePeachyClasses("menu", ["label"]);
</script>
