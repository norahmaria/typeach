<template>
  <PeachyPopover.Popover ref="popover">
    <slot />
  </PeachyPopover.Popover>
</template>

<script lang="ts" setup>
  import { inject, provide, ref } from "vue";

  import { useKeyboardList } from "../../hooks";

  import { PeachyPopover, type PopoverExpose } from "../popover";

  import { MenuContextKey } from "./context";

  const parentMenu = inject(MenuContextKey, undefined);

  const popover = ref<PopoverExpose>();

  const list = ref<HTMLUListElement>();

  const keyboardList = useKeyboardList(list, {
    focus: true,
    loop: true,

    onForwardArrow(element, _) {
      if (element?.matches("[aria-haspopup='menu']")) {
        element?.click();
      }
    },

    onBackArrow(_, __, event) {
      if (parentMenu) {
        popover?.value?.hide();
        parentMenu.keyboardList.refocus();
        event.preventDefault();
      }
    },

    onTab() {
      popover.value?.hideAll();
    },

    onEscape() {
      popover.value?.hideAll();
    },

    filter(element) {
      const menuItemRoles = ["menuitem", "menuitemcheckbox", "menuitemradio"];

      const role = element.getAttribute("role");

      if (role) {
        return menuItemRoles.includes(role);
      }

      return element.getAttribute("aria-haspopup") === "menu";
    },
  });

  provide(MenuContextKey, {
    isRoot: !parentMenu,

    popover,
    keyboardList,

    setList(element) {
      list.value = element;
    },
  });
</script>
