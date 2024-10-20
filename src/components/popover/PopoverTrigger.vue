<template>
  <component
    ref="trigger"
    v-bind="!nonNative && nativeAttributes"
    :is="!nonNative ? 'button' : is"
    :data-open="unref(popover?.isOpen)"
    :disabled="disabled"
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
     * The `is` attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).
     *
     * Will only be applied if `nonNative` is true,
     * as the [popovertarget attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#popovertarget)
     * is only supported by buttons.
     *
     * @default "button"
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
     * Sets the [popovertargetaction](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/popoverTargetAction) attribute.
     */
    action?: "toggle" | "show" | "hide";

    disabled?: boolean;
  }

  const props = withDefaults(defineProps<PopoverTriggerProps>(), {
    is: "button",
    nonNative: false,
    action: "toggle",
    disabled: false,
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
    if (props.disabled) {
      return;
    }

    if (popover?.hover.value) {
      event.preventDefault();
    } else if (props.nonNative) {
      popover?.target.value?.togglePopover();
    }
  };

  const onEntry = () => {
    if (props.disabled) {
      return;
    }

    if (popover?.hover.value) {
      popover.target.value?.showPopover();
    }
  };

  const onLeave = () => {
    if (props.disabled) {
      return;
    }

    if (popover?.hover.value && !popover.target.value?.matches(":hover")) {
      popover.target.value?.hidePopover();
    }
  };
</script>
