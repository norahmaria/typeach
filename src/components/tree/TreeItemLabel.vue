<template>
  <span @pointerenter="onPointerEnter">
    <slot />
  </span>
</template>

<script lang="ts" setup>
  import { inject } from "vue";

  import { TreeContextKey, TreeItemContextKey } from "./context";

  const tree = inject(TreeContextKey);

  const item = inject(TreeItemContextKey);

  const onPointerEnter = () => {
    if (item?.id.value) {
      tree?.tree.onItemPointerEnter(item.id.value);
    }
  };
</script>
