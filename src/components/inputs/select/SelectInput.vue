<template>
  <PeachyPopover.Popover ref="popover">
    <slot :selected-ids="internalSelectedIds" />
  </PeachyPopover.Popover>
</template>

<script lang="ts" setup>
  import { provide, readonly as vueReadonly, ref, toRef, watch } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { useListBox, useInput } from "@/hooks";

  import { PeachyPopover, type PopoverExpose } from "@/components/popover";

  import { SelectContextKey } from "./context";

  export interface SelectProps {
    readonly?: boolean;
    multiSelect?: boolean;
    selectedIds?: string[];
  }

  const props = withDefaults(defineProps<SelectProps>(), {
    readonly: false,
    multiSelect: false,
    selectedIds: () => [],
  });

  const emit = defineEmits<{
    "update:selected-ids": [ids: string[]];
    validate: [ids: string[]];
    "clear-validation": [];
  }>();

  const readonlyRef = toRef(props, "readonly");

  const multiSelect = toRef(props, "multiSelect");

  const popover = ref<PopoverExpose>();

  const list = ref<HTMLDivElement>();

  const internalSelectedIds = ref<string[]>(props.selectedIds);

  const activeDescendantId = ref<string>();

  const triggerId = ref<string>("");

  const input = useInput(triggerId, internalSelectedIds, emit, {
    isSame(oldValue, newValue) {
      return true;
    },
  });

  watch(internalSelectedIds, newInternalSelectedIds => {
    input.validate();
  });

  const listBox = useListBox(list, multiSelect, readonlyRef, {
    onExit(navigate, updateItem) {
      popover.value?.hide();
    },

    filter(element) {
      return element.getAttribute("role") === "option";
    },

    onUnknownKey(element, navigate, event, updateItem) {
      if (["Backspace", "Delete"].includes(event.key) && !readonlyRef.value) {
        internalSelectedIds.value = [];
      }
    },

    disabledFilter(element) {
      return element.getAttribute("aria-disabled") === "true";
    },
  });

  provide(SelectContextKey, {
    popover,
    listBox,
    activeDescendantId: vueReadonly(activeDescendantId),
    selectedIds: vueReadonly(listBox.selectedIds),
    multiSelect: vueReadonly(multiSelect),
    readonly: vueReadonly(readonlyRef),

    setTriggerId(id) {
      triggerId.value = id;
    },

    setSelectedIds(ids) {
      listBox.selectedIds.value = ids;
    },

    setList(element) {
      list.value = element;
    },
  });

  watch(listBox.activeItem ?? ref(), newActiveItem => {
    activeDescendantId.value = newActiveItem?.getAttribute("id") ?? undefined;
  });

  watch(listBox.selectedIds, newSelectedIds => {
    internalSelectedIds.value = newSelectedIds;
  });

  watchImmediate(toRef(props, "selectedIds"), newSelectedIds => {
    internalSelectedIds.value = newSelectedIds;
  });

  watchImmediate(internalSelectedIds, newSelectedIds => {
    listBox.selectedIds.value = newSelectedIds;
    emit("update:selected-ids", newSelectedIds);
  });
</script>
