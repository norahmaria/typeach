<template>
  <InternalMenuItem
    :class="[itemClass(), checkboxItemClass()]"
    :aria-checked="checked"
    :disabled="disabled"
    role="menuitemcheckbox"
    @click="$emit('update:checked', !checked)">
    <slot />
  </InternalMenuItem>
</template>

<script lang="ts" setup>
  import { usePeachyClasses } from "@/hooks";

  import InternalMenuItem from "./private/MenuItem.internal.vue";

  export interface MenuCheckboxItemProps {
    disabled?: boolean;
    checked: boolean;
  }

  defineProps<MenuCheckboxItemProps>();

  defineEmits<{
    "update:checked": [isChecked: boolean];
  }>();

  const { itemClass, checkboxItemClass } = usePeachyClasses("menu", [
    "item",
    "checkboxItem",
  ]);
</script>
