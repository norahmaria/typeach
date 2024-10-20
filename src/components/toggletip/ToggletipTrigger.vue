<template>
  <PeachyPopover.Trigger
    ref="trigger"
    :is="is"
    :class="triggerClass()"
    :aria-expanded="trigger?.isOpen"
    :aria-controls="trigger?.targetId"
    non-native>
    <slot />
  </PeachyPopover.Trigger>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { usePeachyClasses } from "@/hooks";

  import { PeachyPopover, type PopoverExpose } from "../popover";

  export interface ToggletipTriggerProps {
    /**
     * The `is` attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).
     */
    is?: string;
  }

  withDefaults(defineProps<ToggletipTriggerProps>(), {
    is: "button",
  });

  const { triggerClass } = usePeachyClasses("toggletip", ["trigger"]);

  const trigger = ref<PopoverExpose>();
</script>
