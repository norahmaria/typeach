<template>
  <PeachyPopover.Trigger :class="triggerClass()" non-native>
    <slot />
  </PeachyPopover.Trigger>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "../../hooks";

  import { PeachyPopover } from "../popover";

  const { triggerClass } = usePeachyClasses("toggletip", ["trigger"]);
</script>
