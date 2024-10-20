<template>
  <PeachyPopover.Target
    :is="is"
    :class="targetClass()"
    :placement="placement"
    role="tooltip">
    <slot />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import type { Placement } from "@floating-ui/vue";

  import { usePeachyClasses } from "@/hooks";

  import { PeachyPopover } from "../popover";

  export interface TooltipTargetProps {
    /**
     * The [placement option](https://floating-ui.com/docs/tutorial#placements)
     * for [Floating UI](https://floating-ui.com).
     */
    placement?: Placement;

    /**
     * The `is` attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).
     */
    is?: string;
  }

  withDefaults(defineProps<TooltipTargetProps>(), {
    placement: "top",
    is: undefined,
  });

  const { targetClass } = usePeachyClasses("tooltip", ["target"]);
</script>
