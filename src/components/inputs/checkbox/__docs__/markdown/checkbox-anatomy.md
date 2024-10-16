```vue
<template>
  <!-- Single checkbox --->
  <PeachyInput.Input>
    <PeachyCheckbox.Input>
      <!-- #before or #after -->
      <template #after>
        <PeachyCheckbox.Indicator>
          <template #indeterminate />
        </PeachyCheckbox.Indicator>

        <PeachyInput.Label />
      </template>
    </PeachyCheckbox.Input>
  </PeachyInput.Input>

  <!-- Checkbox group --->
  <PeachyInput.Group>
    <PeachyInput.GroupLabel />

    <PeachyInput.Input>
      <PeachyCheckbox.Input>
        <!-- #before or #after -->
        <template #after>
          <PeachyCheckbox.Indicator>
            <template #indeterminate />
          </PeachyCheckbox.Indicator>

          <PeachyInput.Label />
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>
  </PeachyInput.Group/>
</template>

<script lang="ts" setup>
  import { PeachyCheckbox, PeachyInput } from "typeach";
</script>
```

**A checkbox can be nested as many times as needed.**
