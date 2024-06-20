# Progress

<br/>

<script lang="ts" setup>
  import Progress from './progress/Progress.vue'
  import './progress/progress.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Progress />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./progress/Progress.vue#snippet
<<< ./progress/progress.css
:::

## Anatomy

```vue
<template>
  <PeachyProgress.Progress>
    <PeachyProgress.Label />
  </PeachyProgress.Progress>
</template>

<script lang="ts" setup>
  import { PeachyProgress } from "typeach";
</script>
```

## Props & Emits

### `Progress`

<br />

#### Props

| Name  | Default |   Type    |
| ----- | :-----: | :-------: |
| value |         | `number`  |
| min   |   `0`   | `number?` |
| max   |  `100`  | `number?` |

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

## Accessibility

Resources: [APG Meter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
