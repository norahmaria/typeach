<template>
  <PeachyPopover.Target
    :class="targetClass()"
    :placement="placement"
    role="tooltip">
    <slot />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import type { Placement } from "@floating-ui/vue";

  import { usePeachyClasses } from "../../hooks";

  import { PeachyPopover } from "../popover";

  export interface TooltipTargetProps {
    placement?: Placement;
  }

  withDefaults(defineProps<TooltipTargetProps>(), {
    placement: "top",
  });

  const { targetClass } = usePeachyClasses("tooltip", ["target"]);
</script>
