<template>
  <!-- eslint-disable-next-line vuejs-accessibility/mouse-events-have-key-events -->
  <component
    ref="target"
    v-bind="attributes"
    :is="is"
    :id="id"
    :style="[floatingStyles, 'margin: 0;']"
    :data-placement="_placement"
    :data-open="unref(popover?.isOpen)"
    @mouseleave="onLeave">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed, inject, watch, ref, toRef, unref, onUpdated } from "vue";
  import { useEventListener, watchImmediate } from "@vueuse/core";

  import { useFloating, flip, shift, type Placement } from "@floating-ui/vue";

  import { createRandomId } from "@/hooks";

  import {
    PopoverContextKey,
    PopoverRootTargetKey,
    type PopoverExpose,
    hidePopoverWithThrottle,
    updatePopover,
  } from "./context";

  export interface PopoverTargetProps {
    id?: string;

    /**
     * @see https://vuejs.org/api/built-in-special-attributes.html#is
     */
    is?: string;

    /**
     * When set to true, it sets the popover attribute
     * to "manual", meaning clicking  outside the popover and
     * pressing {Escape} won't close the popover.
     *
     * @default "false"
     */
    modal?: boolean;

    /**
     * When set to true, pressing {Escape} will
     * close all parent popovers.
     *
     * @default "false"
     */
    hardEscape?: boolean;

    /**
     * The preferred placement for Floating UI.
     *
     * @default "bottom"
     * @see https://floating-ui.com/docs/tutorial#placements
     */
    placement?: Placement;
  }

  const props = withDefaults(defineProps<PopoverTargetProps>(), {
    id: () => createRandomId(),
    is: "div",
    modal: false,
    placement: "bottom",
    hardEscape: false,
  });

  const modalRef = toRef(props, "modal");

  const hardEscapeRef = toRef(props, "hardEscape");

  const popover = inject(PopoverContextKey);

  const rootTarget = inject(PopoverRootTargetKey, ref());

  const trigger = computed(() => popover?.trigger.value);

  const target = ref<HTMLElement>();

  const attributes = computed(() => ({
    popover: modalRef.value ? "manual" : "auto",
  }));

  const {
    floatingStyles,
    update,
    placement: _placement,
  } = useFloating(trigger, target, {
    placement: toRef(props, "placement"),
    middleware: [flip({ padding: 20 }), shift({ padding: 20 })],
    open: popover?.isOpen,
  });

  onUpdated(() => update());

  defineExpose<PopoverExpose>(popover?.expose);

  useEventListener(document, "keydown", evt => {
    if (!modalRef.value && hardEscapeRef.value && evt.key === "Escape") {
      hidePopoverWithThrottle(rootTarget?.value);
    }
  });

  useEventListener(window, "resize", event => {
    if (popover?.isOpen.value) {
      updatePopover(update);
    }
  });

  useEventListener(document, "scroll", event => {
    if (popover?.isOpen.value) {
      updatePopover(update);
    }
  });

  watchImmediate(target, newTarget => {
    popover?.setTarget(newTarget);
  });

  watchImmediate(toRef(props, "id"), newId => {
    popover?.setTargetId(newId);
  });

  watch(popover?.isOpen ?? ref(), newOpen => {
    if (newOpen) {
      update();
    }
  });

  const onLeave = () => {
    if (popover?.hover.value) {
      target.value?.hidePopover();
    }
  };
</script>
