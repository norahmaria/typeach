<template>
  <PeachyPopover.Target
    ref="target"
    :is="is"
    :class="targetClass()"
    :placement="placement"
    role="status">
    <slot v-if="target?.isOpen" />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import type { Placement } from "@floating-ui/vue";

  import { usePeachyClasses } from "@/hooks";

  import { PeachyPopover, type PopoverExpose } from "../popover";

  export interface ToggletipTargetProps {
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

  withDefaults(defineProps<ToggletipTargetProps>(), {
    placement: "top",
    is: "div",
  });

  const { targetClass } = usePeachyClasses("toggletip", ["target"]);

  const target = ref<PopoverExpose>();

  onMounted(() => {
    target.value?.show();
  });
</script>
