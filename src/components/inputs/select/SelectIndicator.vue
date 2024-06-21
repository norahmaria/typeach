<template>
  <div
    :class="indicatorClass()"
    :data-selected="unref(selectItem?.selected)"
    aria-hidden="true">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { SelectItemContextKey } from "./context";

  const { indicatorClass } = usePeachyClasses("select", ["indicator"]);

  const selectItem = inject(SelectItemContextKey);
</script>
