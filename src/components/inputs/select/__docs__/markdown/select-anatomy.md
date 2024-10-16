```vue
<template>
  <PeachyInput.Input>
    <PeachySelect.Input>
      <PeachyInput.Label />

      <PeachySelect.Trigger />

      <PeachySelect.Target>
        <PeachySelect.List>
          <PeachySelect.Label />
          <PeachySelect.Separator />

          <PeachySelect.Item>
            <PeachySelect.Indicator />
          </PeachySelect.Item>
        </PeachySelect.List>
      </PeachySelect.Target>
    </PeachySelect.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyInput, PeachySelect } from "typeach";
</script>
```

- The component clears the values when pressing backspace or delete, however this is not a recognized pattern for clearing a listbox, and is not available on all devices - so it is important to communicate this shortcut to the user if you want them to be aware of it, and offer an alternative. **The recommended approach is to have one of the options represent no value, such as a "None" option.** _In the example, if I detect that the selected item is "none", I clear the value._
