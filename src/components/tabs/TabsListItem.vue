<template>
  <button
    v-if="tabsContext"
    :id="`${id}-list-item`"
    :class="listItemClass()"
    :aria-controls="id"
    :aria-selected="tabsContext.currentTab.value === id"
    type="button"
    role="tab"
    tabindex="-1"
    @click="onClick"
    @focus="onFocus">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { inject, onMounted } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { TabsContextKey } from "./context";

  const tabsContext = inject(TabsContextKey);

  export interface TabsListItemProps {
    id: string;
  }

  const props = defineProps<TabsListItemProps>();

  const { listItemClass } = usePeachyClasses("tabs", ["listItem"]);

  onMounted(() => {
    tabsContext?.addTab(props.id);
  });

  const openPanel = () => {
    if (tabsContext) {
      tabsContext.currentTab.value = props.id;
    }
  };

  const onFocus = (event: FocusEvent) => {
    if (tabsContext?.followFocus.value) {
      openPanel();
    }
  };

  const onClick = (event: MouseEvent) => {
    openPanel();
  };
</script>
