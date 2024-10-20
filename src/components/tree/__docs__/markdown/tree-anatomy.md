```vue
<template>
  <PeachyTree.Tree>
    <PeachyTree.item>
      <PeachyTree.ItemLabel />
      <PeachyTree.ItemIndicator />

      <template #children />
    </PeachyTree.item>
  </PeachyTree.Tree>
</template>

<script lang="ts" setup>
  import { PeachyTree } from "typeach";
</script>
```

- The children slot should _always_ be rendered when the item has children - even if they're not loaded yet, and should not be there for childless items. The component looks as the presence of this slot to see if it's a parent or not.

### Usage (UX)

It is recommended to let the user know when a parent has any children selected. You'll see that in the example we've done this by:

- Using the indicator to communicate this visually.
- Using [visually hidden text](to:visually-hidden) text inside the label to announce when there are children selected for screen readers. _It's preferable to only inform when a child is selected, and not when no children are selected - to avoid repetition._
