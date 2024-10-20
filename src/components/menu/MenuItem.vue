<template>
  <InternalMenuItem
    :class="itemClass()"
    :disabled="disabled"
    role="menuitem"
    @click="$emit('click', $event)">
    <slot />
  </InternalMenuItem>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  import InternalMenuItem from "./private/MenuItem.internal.vue";

  export interface MenuItemProps {
    disabled?: boolean;
  }

  defineProps<MenuItemProps>();

  defineEmits<{
    click: [event: MouseEvent];
  }>();

  const { itemClass } = usePeachyClasses("menu", ["item"]);
</script>
