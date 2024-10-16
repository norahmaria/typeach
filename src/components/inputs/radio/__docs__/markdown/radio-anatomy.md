```vue
<template>
  <PeachyInput.Input>
    <PeachyRadio.Input>
      <template #before />

      <PeachyRadio.InputLabel />

      <PeachyRadio.Radio>
        <PeachyRadio.Indicator />
        <PeachyRadio.Label />
      </PeachyRadio.Radio>

      <template #after />
    </PeachyRadio.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyRadio } from "typeach";
</script>
```
