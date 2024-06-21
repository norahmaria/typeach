<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions vuejs-accessibility/interactive-supports-focus -->
  <ul
    ref="list"
    :class="listClass()"
    style="display: grid"
    role="menu"
    @focusin.stop="menu?.keyboardList.onFocusIn"
    @keydown.prevent="menu?.keyboardList.onKeyDown">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
  import { ref, inject } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses } from "@/hooks";

  import { MenuContextKey, type MenuContext } from "./context";

  const { listClass } = usePeachyClasses("menu", ["list"]);

  const list = ref<HTMLUListElement>();

  const menu = inject<MenuContext>(MenuContextKey);

  watchImmediate(list, newList => {
    menu?.setList(newList);
  });
</script>
