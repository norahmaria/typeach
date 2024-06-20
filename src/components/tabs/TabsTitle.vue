<template>
  <HierarchyTitle v-if="tabsContext" :id="id" :class="titleClass()">
    <template #title>
      <slot />
    </template>
  </HierarchyTitle>
</template>

<script lang="ts" setup>
  import { inject, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "../../hooks";

  import { TabsContextKey } from "./context";

  import HierarchyTitle from "../HierarchyTitle.vue";

  export interface TabsTitleProps {
    id?: string;
  }

  const props = withDefaults(defineProps<TabsTitleProps>(), {
    id: () => createRandomId(),
  });

  const { titleClass } = usePeachyClasses("tabs", ["title"]);

  const idRef = toRef(props, "id");

  const tabsContext = inject(TabsContextKey);

  watchImmediate(idRef, newId => {
    tabsContext?.setTitleId(newId);
  });
</script>
