<template>
  <ul
    ref="element"
    :aria-multiselectable="multiSelect"
    :role="!parentTree ? 'tree' : 'group'"
    @focusin="tree.onFocusIn"
    @keydown.stop="tree.onKeyDown">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
  import { computed, inject, provide, ref, toRef } from "vue";

  import { useTree } from "@/hooks/useTree";
  import { TreeContextKey } from "./context";

  export interface TreeProps {
    count: number;
    multiSelect?: boolean;
  }

  const props = withDefaults(defineProps<TreeProps>(), {
    multiSelect: false,
  });

  const countRef = toRef(props, "count");

  const element = ref<HTMLDivElement>();

  const parentTree = inject(TreeContextKey, undefined);

  const tree = useTree(element);

  provide(TreeContextKey, {
    tree,
    count: countRef,
    level: computed(() => parentTree?.level.value ?? 0 + 1),
  });
</script>
