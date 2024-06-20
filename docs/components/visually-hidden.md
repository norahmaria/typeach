# Visually Hidden

Visually hides some content but keeps it available for screen readers.

::: warning DO NOT USE FOR INTERACTIVE ELEMENTS
Should not be used to hide interactive elements (e.g. inputs), as this will make it disappear for screen readers too due to the `height` and `width` of `1px`. This component is intended for hiding text that might feel excessive to a sighted user, but is necessary for everyone else.
:::

```vue
<template>
  <PeachyVisuallyHidden>
    <!-- Content-->
  </PeachyVisuallyHidden>
</template>

<script lang="ts" setup>
  import { PeachyVisuallyHidden } from "typeach";
</script>
```

## Props & Emits

### `VisuallyHidden`

<br/>

#### Props

| Name | Default |    Type    |
| ---- | :-----: | :--------: |
| hide | `true`  | `boolean?` |
