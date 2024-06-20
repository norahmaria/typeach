<template>
  <button id="outside-button">Button outside</button>

  <PeachyTabs.Tabs v-model:tab="tab" :follow-focus="openTabOnFocus">
    <PeachyTabs.Title id="title">Tabs</PeachyTabs.Title>

    <div class="tabs">
      <PeachyTabs.List class="list">
        <PeachyTabs.ListItem id="zero">Tab 0</PeachyTabs.ListItem>
        <PeachyTabs.ListItem id="one">Tab 1</PeachyTabs.ListItem>
      </PeachyTabs.List>

      <PeachyTabs.Panel id="zero">Tab 0 Content</PeachyTabs.Panel>
      <PeachyTabs.Panel id="one">Tab 1 Content</PeachyTabs.Panel>
    </div>
  </PeachyTabs.Tabs>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyTabs } from "../";

  withDefaults(defineProps<{ openTabOnFocus?: boolean }>(), {
    openTabOnFocus: false,
  });

  const tab = ref("zero");
</script>

<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
