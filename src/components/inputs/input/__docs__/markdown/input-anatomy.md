```vue
<template>
  <PeachyInput.Group>
    <PeachyInput.GroupLabel />

    <PeachyInput.Input>
      <PeachyInput.Label />
      <PeachyInput.Description />
      <PeachyInput.Error />
      <!-- <Component>.Input -->
    </PeachyInput.Input>
  </PeachyInput.Group>
</template>

<script lang="ts" setup>
  import { PeachyInput } from "typeach";
</script>
```

- `Input` is purely for decoration purposes.
- Some inputs have built-in labels, so check the individual examples.
