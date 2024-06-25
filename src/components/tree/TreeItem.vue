<template>
  <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events vuejs-accessibility/interactive-supports-focus -->
  <li
    :id="id"
    :class="itemClass()"
    :aria-selected="selected"
    :aria-expanded="!$slots.children ? undefined : isOpen"
    :aria-setsize="unref(tree?.count)"
    :aria-posinset="position"
    :aria-level="unref(tree?.level)"
    :tabindex="tabIndex"
    role="treeitem"
    @click="onClick">
    <slot />

    <slot v-if="isOpen" name="children" />
  </li>
</template>

<script lang="ts" setup>
  import { computed, inject, provide, toRef, unref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { TreeContextKey, TreeItemContextKey } from "./context";

  export interface TreeItemProps {
    id: string;
    selected: boolean;
    position: number;
  }

  const props = defineProps<TreeItemProps>();

  const emit = defineEmits<{
    toggle: [];
  }>();

  const { itemClass } = usePeachyClasses("tree", ["item"]);

  const tree = inject(TreeContextKey);

  const idRef = toRef(props, "id");

  const positionRef = toRef(props, "position");

  const isOpen = computed(() => {
    if (!tree) {
      return false;
    }

    const { openSelection } = tree.tree;

    return openSelection.selectedIds.value.includes(idRef.value);
  });

  const tabIndex = computed(() => {
    if (!tree) {
      return -1;
    }

    if (tree.tree.activeItem.value) {
      const active =
        tree.tree.activeItem.value.getAttribute("id") === idRef.value;

      return active ? 0 : -1;
    }

    const firstItem = tree.level.value === 1 && positionRef.value === 1;

    return firstItem ? 0 : -1;
  });

  const onClick = (event: MouseEvent) => {
    const shouldToggle = tree?.tree.onItemClick(event, props.id);

    if (shouldToggle) {
      emit("toggle");
    }
  };

  provide(TreeItemContextKey, {
    id: idRef,
    selected: toRef(props, "selected"),

    toggle() {
      emit("toggle");
    },
  });
</script>
