<template>
  <div :class="indicatorClass()" aria-hidden="true">
    <slot />
  </div>
</template>

<script lang="ts" generic="T" setup>
  import { usePeachyClasses } from "@/hooks";

  const { indicatorClass } = usePeachyClasses("switch", ["indicator"]);
</script>
