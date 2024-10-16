<template>
  <InternalMenuItem
    :class="[itemClass(), radioItemClass()]"
    :aria-checked="unref(group?.value) === value"
    :disabled="disabled"
    role="menuitemradio"
    @click="group?.onRadioClick(value as T)">
    <slot />
  </InternalMenuItem>
</template>

<script lang="ts" generic="T" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import InternalMenuItem from "./private/MenuItem.internal.vue";

  import { MenuRadioGroupContextKey } from "./context";

  export interface MenuRadioItemProps<V> {
    disabled?: boolean;
    value: V;
  }

  defineProps<MenuRadioItemProps<T>>();

  const { itemClass, radioItemClass } = usePeachyClasses("menu", [
    "item",
    "radioItem",
  ]);

  const group = inject(MenuRadioGroupContextKey);
</script>
