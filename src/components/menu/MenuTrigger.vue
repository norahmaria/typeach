<template>
  <!-- eslint-disable-next-line tvuejs-accessibility/mouse-events-have-key-events vuejs-accessibility/mouse-events-have-key-events -->
  <PeachyPopover.Trigger
    ref="item"
    :class="[!menu?.isRoot ? [itemClass(), subTriggerClass()] : triggerClass()]"
    :role="!menu?.isRoot ? 'menuitem' : undefined"
    :action="menu?.isRoot ? 'toggle' : 'show'"
    :aria-disabled="disabled"
    aria-haspopup="menu"
    @click="onClick"
    @focusin="onFocus"
    @keydown="onKeyDown"
    @pointerenter="onPointerEnter">
    <slot />
  </PeachyPopover.Trigger>
</template>

<script lang="ts" setup>
  import { ref, inject } from "vue";

  import { usePeachyClasses } from "@/hooks";
  import { isHtmlElement } from "@/hooks/utils";

  import { PeachyPopover, type PopoverExpose } from "../popover";
  import { MenuContextKey } from "./context";

  export interface MenuTriggerProps {
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<MenuTriggerProps>(), {
    disabled: false,
  });

  const emit = defineEmits<{
    click: [];
  }>();

  const { triggerClass, itemClass, subTriggerClass } = usePeachyClasses(
    "menu",
    ["item", "trigger", "subTrigger"]
  );

  const item = ref<PopoverExpose>();

  /**
   * Refers to the menu this trigger is for,
   * not the menu it's in, like in the other
   * child components of Menu.
   */
  const menu = inject(MenuContextKey);

  const onKeyDown = (event: KeyboardEvent) => {
    if (props.disabled || !menu) {
      return;
    }

    const { popover, keyboardList, isRoot } = menu;

    if (["ArrowDown", "ArrowUp"].includes(event.key) && isRoot) {
      popover?.value?.show();
      keyboardList.navigate(event.key === "ArrowUp" ? "last" : "first");
      event.preventDefault();
    }
  };

  const onClick = (event?: MouseEvent) => {
    if (!menu) {
      return;
    }

    const { keyboardList, isRoot } = menu;

    if (isRoot || !event?.isTrusted) {
      keyboardList.navigate("first");
    }
  };

  const onPointerEnter = (_: PointerEvent) => {
    if (!menu) {
      return;
    }

    const { popover, keyboardList, isRoot } = menu;

    if (!isRoot) {
      popover?.value?.show();
      popover?.value?.hideChildren();
      keyboardList.navigate(item.value?.getTrigger());
    }
  };

  const onFocus = (event: FocusEvent) => {
    if (!isHtmlElement(event.relatedTarget) || !menu) {
      return;
    }

    const { popover } = menu;

    if (event.relatedTarget?.getAttribute("popovertarget")) {
      popover?.value?.hideSiblings();
    }
  };
</script>
