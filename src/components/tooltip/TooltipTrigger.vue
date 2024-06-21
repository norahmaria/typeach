<template>
  <PeachyPopover.Trigger
    ref="trigger"
    :class="triggerClass()"
    :aria-describedby="trigger?.targetId"
    non-native>
    <slot />
  </PeachyPopover.Trigger>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { PeachyPopover, type PopoverExpose } from "../popover";

  const { triggerClass } = usePeachyClasses("tooltip", ["trigger"]);

  const trigger = ref<PopoverExpose>();
</script>
