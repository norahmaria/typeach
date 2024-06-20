# Toggletip

<br />

<script lang="ts" setup>
  import Toggletip from './toggletip/Toggletip.vue'
  import './toggletip/toggletip.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Toggletip />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./toggletip/Toggletip.vue#snippet
<<< ./toggletip/toggletip.css
:::

## Anatomy

```vue
<template>
  <PeachyToggletip.ToggleTip>
    <PeachyToggletip.Trigger />

    <PeachyToggletip.Target>
      <span />
    </PeachyToggletip.Target>
  </PeachyToggletip.ToggleTip>
</template>

<script lang="ts" setup>
  import { PeachyToggletip } from "typeach";
</script>
```

## Props & Emits

### `Trigger`

<br />

#### Props

| Name | Default  |   Type    | Description                                                                                                                     |
| ---- | :------: | :-------: | ------------------------------------------------------------------------------------------------------------------------------- |
| is   | `button` | `string?` | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components). |

<hr/>

### `Target`

<br />

#### Props

| Name      | Default  |     Type     | Description                                                                                                                         |
| --------- | :------: | :----------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| is        | `button` |  `string?`   | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).     |
| placement | `"top"`  | `Placement?` | The [placement option](https://floating-ui.com/docs/tutorial#positioning) for [Floating UI](https://floating-ui.com/docs/tutorial). |

## Styling

::: info `Target` IS ALWAYS VISIBLE, IT'S CONTENT IS NOT
`Target` will always render to allow announcing the content when it appears for screen readers - you can use a wrapper element inside it to style the toggletip when visible (like in [the example](#toggletip)).
:::

### CSS Selectors

The root component (`Toggletip`) is purely logical and has no element to style, while the child components follow [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                         | Description                                                                                                                                                   |  For                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the toggletip. See [Floating UI](https://floating-ui.com/docs/tutorial). | <ul><li>`Target`</li></ul> |

## Accessibility

Resources: [Tooltip & Toggletips](https://inclusive-components.design/tooltips-toggletips/)

### Keyboard interactions

| Key            | Action                |
| -------------- | --------------------- |
| <kbd>Esc</kbd> | Closes the toggletip. |

The toggletip closes on outside clicks.
