# Text Input

<br/>

<script lang="ts" setup>
  import TextInput from './text-input/TextInput.vue'
  import './text-input/text-input.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <TextInput />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./text-input/TextInput.vue#snippet
<<< ./text-input/text-input.css
:::

## Anatomy

```vue
<template>
  <PeachyInput.Input>
    <PeachyInput.Label />
    <PeachyTextInput.Input />
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyInput, PeachyTextInput } from "typeach";
</script>
```

## Props & Emits

### `Input`

<br/>

#### Props

| Name     | Default |    Type    | Description                                                                                                      |
| -------- | :-----: | :--------: | ---------------------------------------------------------------------------------------------------------------- |
| value    |  `""`   | `string?`  |                                                                                                                  |
| disabled | `false` | `boolean?` |                                                                                                                  |
| readonly | `false` | `boolean?` |                                                                                                                  |
| required | `false` | `boolean?` | The component only labels it as required with `aria-required` and does not deal with any error messages for you. |
| textarea | `false` | `boolean?` |                                                                                                                  |

#### Emits

| @                | Payload  |
| ---------------- | :------: |
| update:value     | `string` |
| validate         | `string` |
| clear-validation |          |

<hr/>

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                                    | Description                                       |  For                      |
| ------------------------------------------- | ------------------------------------------------- | ------------------------- |
| `:disabled`                                 | For a disabled input.                             | <ul><li>`Input`</li></ul> |
| `:read-only`                                | For a read-only input.                            | <ul><li>`Input`</li></ul> |
| `[data-textarea="<boolean>"]` or `textarea` | To differentiate between an input and a textarea. | <ul><li>`Input`</li></ul> |
