<template>
  <PeachyPopover.Target :class="targetClass()">
    <slot />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";
  import { PeachyPopover } from "@/components/popover";

  const { targetClass } = usePeachyClasses("select", ["target"]);
</script>
