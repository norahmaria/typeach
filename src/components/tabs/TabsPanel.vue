<template>
  <div
    v-if="unref(tabsContext?.followFocus) || open"
    v-show="open"
    :id="id"
    :class="panelClass()"
    :aria-labelledby="`${id}-list-item`"
    tabindex="0"
    role="tabpanel">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { inject, computed, unref, toRef } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { TabsContextKey } from "./context";

  export interface TabsPanelProps {
    id: string;
  }

  const props = defineProps<TabsPanelProps>();

  const { panelClass } = usePeachyClasses("tabs", ["panel"]);

  const idRef = toRef(props, "id");

  const tabsContext = inject(TabsContextKey);

  const open = computed(() => {
    return tabsContext?.currentTab.value === idRef.value;
  });
</script>
