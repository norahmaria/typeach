<template>
  <PeachyPopover.Trigger
    ref="item"
    :id="id"
    :class="triggerClass()"
    :data-active="unref(select?.popover?.value?.isOpen)"
    :data-empty="!unref(select?.selectedIds)?.length"
    :disabled="disabled"
    aria-haspopup="listbox"
    @click="onClick"
    @keydown="onKeyDown">
    <slot />
  </PeachyPopover.Trigger>
</template>

<script lang="ts" setup>
  import { ref, inject, toRef, unref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import {
    createRandomId,
    isPrintableCharacter,
    usePeachyClasses,
  } from "@/hooks";

  import { PeachyPopover, type PopoverExpose } from "@/components/popover";

  import { SelectContextKey } from "./context";

  export interface SelectTriggerProps {
    id?: string;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<SelectTriggerProps>(), {
    id: () => createRandomId(),
    disabled: false,
  });

  const emit = defineEmits<{
    click: [];
  }>();

  const { triggerClass } = usePeachyClasses("select", ["trigger"]);

  const select = inject(SelectContextKey);

  watchImmediate(toRef(props, "id"), newId => {
    select?.setTriggerId(newId);
  });

  const item = ref<PopoverExpose>();

  const onClick = async (event: MouseEvent) => {
    if (props.disabled || !select) {
      return;
    }

    /**
     *  Ensure the trigger is focused to allow
     * for use with `<label />`.
     */
    item.value?.getTrigger()?.focus();

    if (!select) {
      return;
    }

    const selectedItem = select.listBox.getFirstSelectedItem();

    if (selectedItem) {
      select.listBox.activeItem.value = selectedItem;
      select.listBox.refocus();
    } else if (select.listBox.activeItem.value) {
      select.listBox.refocus();
    } else {
      select.listBox.navigate("first");
      select.listBox.refocus();
    }
  };

  /* eslint-disable-next-line complexity */
  const onKeyDown = async (event: KeyboardEvent) => {
    if (props.disabled || !select) {
      return;
    }

    const { popover, listBox } = select;

    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"];

    if (openKeys.includes(event.key)) {
      popover?.value?.show();
      event.preventDefault();

      if (["ArrowDown", "Enter", " "].includes(event.key)) {
        if (!listBox.activeItem.value) {
          await listBox.navigate("first");
        }

        listBox.refocus();
      }

      if (["ArrowUp", "Home"].includes(event.key)) {
        listBox.navigate("first");
      }

      if (event.key === "End") {
        listBox.navigate("last");
      }
    }

    if (["Backspace", "Delete"].includes(event.key) && !select.readonly.value) {
      select.setSelectedIds([]);
    }

    if (isPrintableCharacter(event.key)) {
      popover?.value?.show();
      listBox.onKeyDown(event);
      event.preventDefault();
    }
  };
</script>
