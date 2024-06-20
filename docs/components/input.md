# Input

Components to deal with accessible labelling, descriptions, errors and grouping of input elements.

<br/>

<script lang="ts" setup>
  import InputExample from './input/Input.vue'
  import './input/input.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <InputExample />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./input/Input.vue#snippet{6-7,15,19-21}
<<< ./input/input.css [input.css (extends text-input.css)]
:::

## Anatomy

::: info CHECK ANATOMY FOR EACH COMPONENT
Some of the inputs have built in labels.
:::

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

The `Input` is purely for decoration purposes, so that it can be used as a wrapper around inputs.

## Styling

Due to the use of templates `#before` and `#after` to put elements inside an input, a tip is to use [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) on the wrapper element to control placement of slots inside an input.

## Accessibility

Resources: [A Guide To Accessible Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/)

Validation happens when a user blurs the input to give quick feedback _without_ interrupting them while they're in the middle of filling out the input.

Clearing validation happens once they start to re-fill the input.
