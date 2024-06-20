# Dialog

<br/>

<script lang="ts" setup>
  import Dialog from './dialog/Dialog.vue'
  import './dialog/dialog.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Dialog />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./dialog/Dialog.vue#snippet
<<< ./dialog/dialog.css
:::

## Anatomy

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

::: warning ENSURE KEYBOARD ACCESS
A dialog expects to have at least one focusable element so it can manage focus properly. You can use the `autofocus` attribute to decide which element should get first priority.
:::

::: warning ENSURE DIALOG CAN CLOSE
If setting `modal` to `false`, there is no interaction available to close the modal - unless you provide it (with a button or with `closeOnOutsideClick`).
:::

## Props & Emits

### `Target`

<br />

#### Props

| Name                | Default |     Type     | Description                                                                                                                                                                                            |
| ------------------- | :-----: | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| modal               | `true`  |  `boolean?`  |                                                                                                                                                                                                        |
| closeOnOutsideClick | `false` |  `boolean?`  | If `modal` is false, this requires the dialog's `::backdrop` to have a display of none to work.                                                                                                        |
| placement           |         | `Placement?` | The [placement option](https://floating-ui.com/docs/tutorial#positioning) for [Floating UI](https://floating-ui.com/docs/tutorial). See the [Styling](#styling) section for ensuring proper placement. |

<hr/>

## Styling

### CSS Selectors

The root component (`Dialog`) is purely logical and have no elements to style, otherwise the child components follow [our CSS classes convention](/info#styling).

::: info `closeOnOutsideClick` AND `placement` REQUIRE ADDITIONAL STYLES

- To use `clickOnOutsideClick` when `modal` is false you need to set the dialog's `::backdrop` to `display: none`.
- To use `placement`, set the `Target`'s margins to avoid unexpected results due to agent's default styling.
  :::

<br />

#### State selectors

| Selector                  | Description                        |  For                        |
| ------------------------- | ---------------------------------- | --------------------------- |
| `[data-open="<boolean>"]` | For if trigger is open or not.     | <ul><li>`Trigger`</li></ul> |
| `[open]`                  | For an open dialog.                | <ul><li>`Target`</li></ul>  |
| `::backdrop`              | For the overlay on a modal dialog. | <ul><li>`Target`</li></ul>  |

## Accessibility

Resources: [MDN The Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), Scott O'Hara's [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html)

::: warning ENSURE KEYBOARD ACCESS
A dialog expects to have at least one focusable element so it can manage focus properly. You can use the `autofocus` attribute to decide which element should get first priority.
:::

::: warning ENSURE DIALOG CAN CLOSE
If setting `modal` to `false`, there is no interaction available to close the modal - unless you provide it (with a button or with `closeOnOutsideClick`).
:::

Follows the keyboard interactions provided by the [native dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).
