<template>
  <PeachyPopover.Popover :hover="hover">
    <PeachyPopover.Trigger :disabled="disabled">Trigger</PeachyPopover.Trigger>

    <PeachyPopover.Target id="popover" :modal="modal">
      Target
    </PeachyPopover.Target>
  </PeachyPopover.Popover>
</template>

<script lang="ts" setup>
  import { PeachyPopover } from "../";

  export interface NativePopoverProps {
    hover?: boolean;
    modal?: boolean;
    disabled?: boolean;
  }

  withDefaults(defineProps<NativePopoverProps>(), {
    hover: false,
    modal: false,
    disabled: false,
  });
</script>
