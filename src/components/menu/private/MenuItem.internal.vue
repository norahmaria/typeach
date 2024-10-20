<template>
  <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events vuejs-accessibility/no-static-element-interactions vuejs-accessibility/mouse-events-have-key-events -->
  <li
    :aria-disabled="disabled"
    tabindex="-1"
    @click="onClick"
    @focus="unref(menu?.popover)?.hideChildren"
    @pointerenter="menu?.keyboardList.onItemPointerEnter">
    <slot />
  </li>
</template>

<script lang="ts" setup>
  import { unref, inject } from "vue";

  import { MenuContextKey } from "../context";

  export interface InternalMenuItemProps {
    disabled?: boolean;
  }

  const props = defineProps<InternalMenuItemProps>();

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const menu = inject(MenuContextKey);

  const onClick = (event: MouseEvent) => {
    if (props.disabled) {
      console.log("disabaled");
      return;
    }

    emit("click", event);
    menu?.popover?.value?.hideAll();
  };
</script>
