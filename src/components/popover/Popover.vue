<template>
  <slot />
</template>

<script lang="ts" setup>
  import { ref, inject, provide, readonly, toRef, watch } from "vue";

  import {
    PopoverContextKey,
    PopoverRootTargetKey,
    hidePopoverWithThrottle,
    type PopoverExpose,
  } from "./context";

  import { isHtmlElement } from "@/hooks/utils";

  export interface PopoverProps {
    /**
     * When set to true, the target will
     * appear on hover and focus, rather than
     * on click.
     *
     * @default "false"
     */
    hover?: boolean;
  }

  const props = withDefaults(defineProps<PopoverProps>(), {
    hover: false,
  });

  const rootTarget = inject(PopoverRootTargetKey, undefined);

  const targetId = ref<string>();

  const trigger = ref<HTMLElement>();

  const target = ref<HTMLElement>();

  const isOpen = ref<boolean>(false);

  if (!rootTarget) {
    provide(PopoverRootTargetKey, target);
  }

  const expose: PopoverExpose = {
    isOpen,
    targetId,

    hideAll() {
      hidePopoverWithThrottle(rootTarget?.value ?? target.value);
    },

    hideChildren() {
      target.value?.querySelectorAll("[popover]").forEach(element => {
        if (isHtmlElement(element) && element.matches(":popover-open")) {
          element.hidePopover();
        }
      });
    },

    hideSiblings() {
      const siblings = Array.from(target.value?.parentElement?.children ?? []);

      siblings.forEach(element => {
        if (element.isSameNode(target.value ?? null)) {
          return;
        }

        if (isHtmlElement(element) && element?.matches(":popover-open")) {
          element.hidePopover();
        }
      });
    },

    toggle() {
      target.value?.togglePopover();
    },

    show() {
      if (!target.value?.matches(":popover-open")) {
        target.value?.showPopover();
      }
    },

    hide() {
      if (target.value?.matches(":popover-open")) {
        target.value?.hidePopover();
      }
    },

    getTrigger() {
      return trigger.value;
    },

    getTarget() {
      return target.value;
    },
  };

  defineExpose<PopoverExpose>(expose);

  watch(target, newTarget => {
    newTarget?.addEventListener("toggle", event => {
      isOpen.value = (event as ToggleEvent).newState == "open";
    });
  });

  provide(PopoverContextKey, {
    hover: readonly(toRef(props, "hover")),
    isOpen: readonly(isOpen),

    targetId,
    target,
    trigger,

    expose,

    setTargetId(id) {
      targetId.value = id;
    },

    setTarget(element) {
      target.value = element;
    },

    setTrigger(element) {
      trigger.value = element;
    },
  });
</script>
