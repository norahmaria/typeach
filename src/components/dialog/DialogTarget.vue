<template>
  <dialog
    ref="target"
    :id="id"
    :class="targetClass()"
    :style="placement ? floatingStyles : undefined"
    :aria-labelledby="unref(dialog?.titleId)"
    :aria-describedby="unref(dialog?.descriptionId)"
    tabindex="0">
    <HierarchyTitle is="h2">
      <slot />
    </HierarchyTitle>
  </dialog>
</template>

<script lang="ts" generic="T" setup>
  import { ref, unref, inject, toRef, computed, onUpdated, watch } from "vue";
  import { useFloating, flip, shift, type Placement } from "@floating-ui/vue";

  import {
    useEventListener,
    watchImmediate,
    onClickOutside,
  } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "../../hooks";

  import { DialogContextKey, updateDialog } from "./context";

  import HierarchyTitle from "../HierarchyTitle.vue";

  export interface DialogTargetProps {
    id?: string;
    modal?: boolean;

    /**
     * The preferred placement for Floating UI.
     *
     * @default "bottom"
     * @see https://floating-ui.com/docs/tutorial#placements
     */
    placement?: Placement;

    /**
     * If `modal` is false, this requires the dialog's `::backdrop` to have a display of none to work.
     */
    closeOnOutsideClick?: boolean;
  }

  const props = withDefaults(defineProps<DialogTargetProps>(), {
    id: () => createRandomId(),
    modal: true,
    placement: undefined,
    closeOnOutsideClick: false,
  });

  const { targetClass } = usePeachyClasses("dialog", ["target"]);

  const idRef = toRef(props, "id");

  const placementRef = toRef(props, "placement");

  const trigger = computed(() => dialog?.trigger.value);

  const target = ref<HTMLDialogElement>();

  const dialog = inject(DialogContextKey);

  const {
    floatingStyles,
    update,
    placement: _placement,
  } = useFloating(trigger, target, {
    placement: placementRef,
    middleware: [flip({ padding: 20 }), shift({ padding: 20 })],
    open: dialog?.isOpen,
    strategy: "fixed",
  });

  onUpdated(() => update());

  onClickOutside(target, () => {
    if (props.closeOnOutsideClick) {
      dialog?.close();
      target.value?.close();
    }
  });

  useEventListener(window, "resize", event => {
    if (placementRef.value && dialog?.isOpen?.value) {
      updateDialog(update);
    }
  });

  useEventListener(document, "scroll", event => {
    if (placementRef.value && dialog?.isOpen?.value) {
      updateDialog(update);
    }
  });

  useEventListener(target, "close", () => {
    dialog?.close();
  });

  watch(dialog?.isOpen ?? ref(), newOpen => {
    if (placementRef.value && newOpen) {
      update();
    }
  });

  watchImmediate(dialog?.isOpen ?? ref(), newOpen => {
    if (!newOpen) {
      dialog?.close();
      target.value?.close();
      return;
    }

    dialog?.open();

    if (props.modal) {
      target.value?.showModal();
    } else {
      target.value?.show();
    }
  });

  watchImmediate(idRef, newId => {
    dialog?.setTargetId(newId);
  });
</script>
