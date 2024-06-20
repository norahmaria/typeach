# Switch

<br/>

<script lang="ts" setup>
  import Switch from './switch/Switch.vue'
  import './switch/switch.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Switch />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./switch/Switch.vue#snippet
<<< ./switch/switch.css
:::

## Anatomy

Switch does not require a separate `<PeachyInput.Label />` as the `Input` is a button.

```vue
<template>
  <PeachyInput.Input>
    <PeachySwitch.Input>
      <PeachySwitch.Indicator />
      Label
    </PeachySwitch.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyInput, PeachySwitch } from "typeach";
</script>
```

## Props & Emits

### `Input`

<br/>

#### Props

| Name     | Default |    Type    | Description                                                                                                      |
| -------- | :-----: | :--------: | ---------------------------------------------------------------------------------------------------------------- |
| on       | `false` | `boolean?` |                                                                                                                  |
| disabled | `false` | `boolean?` |                                                                                                                  |
| readOnly | `false` | `boolean?` |                                                                                                                  |
| required | `false` | `boolean?` | The component only labels it as required with `aria-required` and does not deal with any error messages for you. |

#### Emits

| @                |  Payload  |
| ---------------- | :-------: |
| update:on        | `boolean` |
| validate         | `boolean` |
| clear-validation |           |

<hr/>

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                | Description              |  For                      |
| ----------------------- | ------------------------ | ------------------------- |
| `[aria-pressed="true"]` | For a switch that is on. | <ul><li>`Input`</li></ul> |

## Accessibility

Resources: Scott O'Hara's [Switch Component: Toggle Button](https://scottaohara.github.io/a11y_styled_form_controls/src/toggle-button-switch/)

::: warning READONLY
The switch is really just a button with the `area-pressed` attribute to determine if it's checked or not, so `readonly` is not really a concept it knows about. However, for consistency, `readonly` is an option - which makes the button focusable but removes the functionality.
:::

### Keyboard interactions

| Key                                  | Action              |
| ------------------------------------ | ------------------- |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Toggles the switch. |
