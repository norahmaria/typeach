<template>
  <PeachyPopover.Target :class="targetClass()" hard-escape>
    <slot />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../hooks";

  import { PeachyPopover } from "../popover";

  const { targetClass } = usePeachyClasses("menu", ["target"]);
</script>
