<template>
  <component
    ref="trigger"
    v-bind="!nonNative && nativeAttributes"
    :is="!nonNative ? 'button' : is"
    :data-open="unref(popover?.isOpen)"
    tabindex="0"
    @click="onClick"
    @focusin="onEntry"
    @focusout="onLeave"
    @mouseenter="onEntry"
    @mouseleave="onLeave">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, toRef, unref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { PopoverContextKey, type PopoverExpose } from "./context";

  export interface PopoverTriggerProps {
    /**
     * Will only be applied if `nonNative` is true,
     * as the popovertarget attribute is only supported
     * by buttons.
     *
     * @default "button"
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#popovertarget
     * @see https://vuejs.org/api/built-in-special-attributes.html#is
     */
    is?: string;

    /**
     * When set to true, the popovertarget
     * attribute is not added to the element.
     *
     * @default "false"
     */
    nonNative?: boolean;

    /**
     * Sets the popovertargetaction attribute.
     *
     * @default "toggle"
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/popoverTargetAction
     */
    action?: "toggle" | "show" | "hide";
  }

  const props = withDefaults(defineProps<PopoverTriggerProps>(), {
    is: "button",
    nonNative: false,
    action: "toggle",
  });

  const actionRef = toRef(props, "action");

  const popover = inject(PopoverContextKey);

  const trigger = ref<HTMLElement>();

  const nativeAttributes = computed(() => ({
    popovertarget: popover?.targetId.value,
    popovertargetaction: actionRef.value,
    type: "button",
  }));

  defineExpose<PopoverExpose>(popover?.expose);

  watchImmediate(trigger, newTrigger => {
    popover?.setTrigger(newTrigger);
  });

  const onClick = (event: MouseEvent) => {
    if (popover?.hover.value) {
      event.preventDefault();
    } else if (props.nonNative) {
      popover?.target.value?.togglePopover();
    }
  };

  const onEntry = () => {
    if (popover?.hover.value) {
      popover.target.value?.showPopover();
    }
  };

  const onLeave = () => {
    if (popover?.hover.value && !popover.target.value?.matches(":hover")) {
      popover.target.value?.hidePopover();
    }
  };
</script>
