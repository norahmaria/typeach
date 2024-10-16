<template>
  <PeachyTabs.Tabs v-model:tab="tab" follow-focus>
    <PeachyTabs.List>
      <PeachyTabs.ListItem v-for="item in items" :key="item.id" :id="item.id">
        {{ item.title }}
      </PeachyTabs.ListItem>
    </PeachyTabs.List>

    <PeachyTabs.Panel :key="tab" :id="tab">
      <slot :name="tab" />
    </PeachyTabs.Panel>
  </PeachyTabs.Tabs>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { PeachyTabs } from "../../components";

  export interface TabsProps {
    items: {
      id: string;
      title: string;
    }[];
  }

  const props = defineProps<TabsProps>();

  const tab = ref<string>(props.items[0]?.id!);
</script>

<style scoped>
  .peachy-tabs__panel > :deep(pre) {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    max-height: 35rem;
  }
</style>
