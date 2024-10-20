<template>
  <PeachyTabs.Tabs v-model:tab="tab">
    <PeachyTabs.Title>Tabs Title</PeachyTabs.Title>

    <PeachyTabs.List>
      <PeachyTabs.ListItem id="zero">Tab 0</PeachyTabs.ListItem>

      <PeachyTabs.ListItem id="one">Tab 1</PeachyTabs.ListItem>

      <PeachyTabs.ListItem id="two">Tab 2</PeachyTabs.ListItem>
    </PeachyTabs.List>

    <PeachyTabs.Panel v-if="tab == 'zero'" key="zero" id="zero">
      Tab 0 Panel
    </PeachyTabs.Panel>

    <PeachyTabs.Panel v-else-if="tab == 'one'" key="one" id="one">
      Tab 1 Panel
    </PeachyTabs.Panel>

    <PeachyTabs.Panel v-else-if="tab == 'two'" key="two" id="two">
      Tab 2 Panel
    </PeachyTabs.Panel>
  </PeachyTabs.Tabs>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyTabs } from "typeach";

  const tab = ref("zero");
</script>
