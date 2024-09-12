<template>
  <div
    v-if="tabsContext"
    ref="tablist"
    :class="listClass()"
    :aria-labelledby="unref(tabsContext.titleId)"
    role="tablist"
    tabindex="0"
    @keydown="onKeyDown"
    @focusin="onFocusIn"
    @focus="onFocus">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { inject, nextTick, ref, unref } from "vue";

  import { useKeyboardList, usePeachyClasses } from "@/hooks";

  import { TabsContextKey } from "./context";

  export interface TabsListProps {
    /**
     * The orientation of the <Tabs.List />.
     *
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
  }

  const props = withDefaults(defineProps<TabsListProps>(), {
    orientation: "horizontal",
  });

  const { listClass } = usePeachyClasses("tabs", ["list"]);

  const tabsContext = inject(TabsContextKey);

  const tablist = ref<HTMLDivElement>();

  /* prettier-ignore */
  const { onKeyDown, onFocusIn } = useKeyboardList(tablist, {
    orientation: props.orientation,
    typeAhead: false,
    loop: true,
  });

  const onFocus = async () => {
    if (!tabsContext) {
      return;
    }

    const currentTab = document.getElementById(
      `${tabsContext.currentTab.value}-list-item`
    );

    await nextTick();
    currentTab?.focus();
  };
</script>
