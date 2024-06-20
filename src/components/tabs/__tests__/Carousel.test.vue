<template>
  <button id="outside-button">Button outside</button>

  <PeachyTabs.Tabs
    v-model:tab="tab"
    id="carousel"
    :interval="3000"
    follow-focus>
    <PeachyTabs.Title>Carousel</PeachyTabs.Title>

    <div class="tabs">
      <PeachyTabs.IntervalController>
        <template #pause>Pause</template>
        <template #resume>Resume</template>
      </PeachyTabs.IntervalController>

      <PeachyTabs.NavigationButton to="next">Next</PeachyTabs.NavigationButton>
      <PeachyTabs.NavigationButton to="previous">
        Previous
      </PeachyTabs.NavigationButton>

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

  const tab = ref("zero");
</script>
