<template>
  <InternalMenuItem :class="itemClass()" role="menuitem">
    <slot />
  </InternalMenuItem>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  import InternalMenuItem from "./private/MenuItem.internal.vue";

  const { itemClass } = usePeachyClasses("menu", ["item"]);
</script>
