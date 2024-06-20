# Disclosure

<br/>

<script lang="ts" setup>
  import Disclosure from './disclosure/Disclosure.vue'
  import './disclosure/disclosure.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Disclosure />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./disclosure/Disclosure.vue#snippet
<<< ./disclosure/disclosure.css
:::

## Anatomy

```vue
<template>
  <PeachyDisclosure.Disclosure>
    <PeachyDisclosure.Trigger />
    <PeachyDisclosure.Target />
  </PeachyDisclosure.Disclosure>
</template>

<script lang="ts" setup>
  import { PeachyDisclosure } from "typeach";
</script>
```

## Props & Emits

### `Disclosure`

<br />

#### Props

| Name | Default |    Type    |
| ---- | :-----: | :--------: |
| open | `false` | `boolean?` |

#### Emits

| @           |  Payload  |
| ----------- | :-------: |
| update:open | `boolean` |

<hr/>

### `Trigger`

<br />

#### Props

| Name | Default  |   Type    | Description                                                                                                                     |
| ---- | :------: | :-------: | ------------------------------------------------------------------------------------------------------------------------------- |
| is   | `button` | `string?` | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components). |

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                      | Description     |  For      |
| ----------------------------- | --------------- | --------- |
| `[aria-expanded="<boolean>"]` | For open state. | `Trigger` |
| `[data-open="<boolean>"]`     | For open state. | `Target`  |

## Accessibility

Resources: [API Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), Scott O'Hara's ["The details and summary elements, again"](https://www.scottohara.me/blog/2022/09/12/details-summary.html)

### Keyboard interactions

| Key                                                   | Action                |
| ----------------------------------------------------- | --------------------- |
| <kbd>Space</kbd> <kbd>Enter</kbd> when on the trigger | Opens the disclosure. |
