```vue
<template>
  <PeachyDialog.Dialog>
    <PeachyDialog.Trigger />

    <PeachyDialog.Target>
      <PeachyDialog.Title />
      <PeachyDialog.Description />
      <PeachyDialog.Close />
    </PeachyDialog.Target>
  </PeachyDialog.Dialog>
</template>

<script lang="ts" setup>
  import { PeachyDialog } from "typeach";
</script>
```

- **A dialog expects to have at least one focusable element** - use the `autofocus` attribute on the element you'd like to be focused when opening the dialog. _If there is no focusable elements inside the dialog, [it will focus on the dialog itself](https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal#:~:text=Otherwise%2C%20if%20nothing%20inside%20the%20dialog%20is%20tabbable%2C%20focus%20the%20dialog%20itself%2C%20so%20that%20at%20least%20something%20gets%20focused.)._
