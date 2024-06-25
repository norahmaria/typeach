<template>
  <button
    :class="itemIndicatorClass()"
    :aria-pressed="unref(treeItem?.selected)"
    aria-hidden="true"
    tabindex="-1"
    @click.stop="treeItem?.toggle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { inject, unref } from "vue";

  import { TreeItemContextKey } from "./context";
  import { usePeachyClasses } from "@/hooks";

  const { itemIndicatorClass } = usePeachyClasses("tree", ["itemIndicator"]);

  const treeItem = inject(TreeItemContextKey);
</script>
