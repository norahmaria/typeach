<template>
  <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
  <div
    ref="list"
    :class="listClass()"
    :aria-multiselectable="unref(select?.multiSelect)"
    :aria-activedescendant="unref(select?.activeDescendantId)"
    role="listbox"
    @keydown="select?.listBox.onKeyDown"
    @focusin="select?.listBox.onFocusIn">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { inject, onMounted, ref, unref } from "vue";
  import { SelectContextKey } from "./context";
  import { usePeachyClasses } from "../../../hooks";

  const select = inject(SelectContextKey);

  const { listClass } = usePeachyClasses("select", ["list"]);

  const list = ref<HTMLDivElement>();

  onMounted(() => {
    select?.setList(list.value);
  });
</script>
