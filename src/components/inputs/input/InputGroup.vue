<template>
  <fieldset :class="groupClass()">
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  const { groupClass } = usePeachyClasses("input", ["group"]);
</script>
