<template>
  <PeachyPopover.Target
    ref="target"
    :class="targetClass()"
    :placement="placement"
    role="status">
    <slot v-if="target?.isOpen" />
  </PeachyPopover.Target>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import type { Placement } from "@floating-ui/vue";

  import { usePeachyClasses } from "../../hooks";

  import { PeachyPopover, type PopoverExpose } from "../popover";

  export interface ToggletipTargetProps {
    placement?: Placement;
  }

  withDefaults(defineProps<ToggletipTargetProps>(), {
    placement: "top",
  });

  const { targetClass } = usePeachyClasses("toggletip", ["target"]);

  const target = ref<PopoverExpose>();

  onMounted(() => {
    target.value?.show();
  });
</script>
