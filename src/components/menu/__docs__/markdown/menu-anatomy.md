```vue
<template>
  <PeachyMenu.Menu>
    <PeachyMenu.Trigger />

    <PeachyMenu.Target>
      <PeachyMenu.List>
        <PeachyMenu.Item />
        <PeachyMenu.Label />
        <PeachyMenu.CheckboxItem />
        <PeachyMenu.Menu />
        <PeachyMenu.Separator />

        <PeachyMenu.RadioGroup>
          <PeachyMenu.Label />
          <PeachyMenu.RadioItem />
        </PeachyMenu.RadioGroup>
      </PeachyMenu.List>
    </PeachyMenu.Target>
  </PeachyMenu.Menu>
</template>

<script lang="ts" setup>
  import { PeachyMenu } from "typeach";
</script>
```

**A menu can be nested as many times as needed** - any menu will automatically adjust to be a menu or submenu depending on where you place it.
