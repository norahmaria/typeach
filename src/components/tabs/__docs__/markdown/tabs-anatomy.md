```vue
<template>
  <PeachyTabs.Tabs>
    <PeachyTabs.Title />

    <PeachyTabs.IntervalController>
      <template #pause />
      <template #resume />
    </PeachyTabs.IntervalController>

    <PeachyTabs.NavigationButton />

    <PeachyTabs.List>
      <PeachyTabs.ListItem id="<tab-id>" />
    </PeachyTabs.List>

    <PeachyTabs.Panel id="<tab-id>" />
  </PeachyTabs.Tabs>
</template>

<script lang="ts" setup>
  import { PeachyTabs } from "typeach";
</script>
```
