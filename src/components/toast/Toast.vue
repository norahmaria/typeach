<template>
  <component
    v-if="isOpen"
    ref="toast"
    :is="is"
    :class="toastClass()"
    :aria-atomic="true"
    :aria-live="assertive ? 'assertive' : 'polite'"
    popover="manual"
    role="status"
    tabindex="0">
    <slot v-if="show" />
  </component>
</template>

<script lang="ts" setup>
  import { provide, watch, ref, nextTick, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses } from "../../hooks";

  import { ToastContextKey } from "./context";

  export interface ToastProps {
    is?: string;

    /**
     * The aria-live attribute for the toast.
     */
    assertive?: boolean;

    /**
     * Whether the toast is open or not.
     * @default false
     */
    open?: boolean;

    /**
     * Close automatically after x milliseconds.
     *
     * @default undefined
     */
    closeAfter?: number;
  }

  const props = withDefaults(defineProps<ToastProps>(), {
    is: "div",
    assertive: false,
    open: false,
    closeAfter: undefined,
  });

  const emit = defineEmits<{
    "update:open": [isOpen: boolean];
  }>();

  const { toastClass } = usePeachyClasses("toast");

  const isOpen = ref(props.open);

  const toast = ref<HTMLElement>();

  const show = ref(false);

  let timeout: undefined | number;

  watchImmediate(isOpen, newIsOpen => {
    if (newIsOpen) {
      setTimeout(() => {
        show.value = true;
      }, 0);
    } else {
      show.value = false;
    }
  });

  watch(toRef(props, "open"), newOpen => {
    isOpen.value = newOpen;

    if (props.closeAfter !== undefined) {
      newOpen ? startCloseTimeout() : clearTimeout(timeout);
    }
  });

  watch(isOpen, async newOpen => {
    emit("update:open", newOpen);

    await nextTick();

    if (newOpen) {
      toast.value?.showPopover();
    } else {
      toast.value?.hidePopover();
    }
  });

  provide(ToastContextKey, {
    close() {
      isOpen.value = false;
    },
  });

  const isInteracting = () =>
    toast.value?.matches(":hover") ||
    toast.value?.matches(":focus") ||
    toast.value?.matches(":focus-within");

  const startCloseTimeout = () => {
    if (!props.closeAfter) {
      return;
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (isInteracting()) {
        return startCloseTimeout();
      }

      isOpen.value = false;
    }, props.closeAfter);
  };
</script>
