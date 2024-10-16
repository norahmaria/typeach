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

  import { usePeachyClasses, createRandomId } from "@/hooks";

  import { DialogContextKey, updateDialog } from "./context";

  import HierarchyTitle from "../hierarchy-title/HierarchyTitle.vue";

  export interface DialogTargetProps {
    id?: string;

    /**
     * If set to `false` - there's actually [no way to
     * close the dialog unless you provide it](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#:~:text=It%20is%20important%20to%20provide%20a%20closing%20mechanism%20within%20every%20dialog%20element.%20The%20Esc%20key%20does%20not%20close%20non%2Dmodal%20dialogs%20by%20default%2C%20nor%20can%20one%20assume%20that%20a%20user%20will%20even%20have%20access%20to%20a%20physical%20keyboard%20(e.g.%2C%20someone%20using%20a%20touch%20screen%20device%20without%20access%20to%20a%20keyboard).).
     */
    modal?: boolean;

    /**
     * The [placement option](https://floating-ui.com/docs/tutorial#placements)
     * for [Floating UI](https://floating-ui.com).
     */
    placement?: Placement;

    /**
     * If `modal` is `false` - the dialog's `::backdrop`
     * need to have a display of none to trigger
     * outside clicks.
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
