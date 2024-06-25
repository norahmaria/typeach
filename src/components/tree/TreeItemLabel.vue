<template>
  <span :class="itemLabelClass()" @pointerenter="onPointerEnter">
    <slot />
  </span>
</template>

<script lang="ts" setup>
  import { inject } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { TreeContextKey, TreeItemContextKey } from "./context";

  const { itemLabelClass } = usePeachyClasses("tree", ["itemLabel"]);

  const tree = inject(TreeContextKey);

  const item = inject(TreeItemContextKey);

  const onPointerEnter = () => {
    if (item?.id.value) {
      tree?.tree.onItemPointerEnter(item.id.value);
    }
  };
</script>
