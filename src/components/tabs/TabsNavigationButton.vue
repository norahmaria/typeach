<!-- @WIP -->

<template>
  <button
    :class="navigationButtonClass()"
    :data-to="to"
    type="button"
    @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { inject } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { TabsContextKey } from "./context";

  export interface TabsNavigationButtonProps {
    to: "next" | "previous";
  }

  const props = defineProps<TabsNavigationButtonProps>();

  const { navigationButtonClass } = usePeachyClasses("tabs", [
    "navigationButton",
  ]);

  const tabsContext = inject(TabsContextKey);

  const onClick = () => {
    tabsContext?.navigate(props.to);
  };
</script>
