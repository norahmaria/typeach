# Tooltip

::: warning UNUSABLE ON TOUCH DEVICES

For a touch-friendly alternative check out [`<PeachyToggletip />`](/components/toggletip).

:::

<script lang="ts" setup>
  import Tooltip from './tooltip/Tooltip.vue'
  import './tooltip/tooltip.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Tooltip />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./tooltip/Tooltip.vue#snippet
<<< ./tooltip/tooltip.css
:::

## Anatomy

```vue
<template>
  <PeachyTooltip.Tooltip>
    <PeachyTooltip.Trigger />

    <PeachyTooltip.Target>
      <span />
    </PeachyTooltip.Target>
  </PeachyTooltip.Tooltip>
</template>

<script lang="ts" setup>
  import { PeachyTooltip } from "typeach";
</script>
```

## Props & Emits

### `Target`

<br />

#### Props

| Name      | Default  |     Type     | Description                                                                                                                         |
| --------- | :------: | :----------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| is        | `button` |  `string?`   | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).     |
| placement | `"top"`  | `Placement?` | The [placement option](https://floating-ui.com/docs/tutorial#positioning) for [Floating UI](https://floating-ui.com/docs/tutorial). |

## Styling

::: warning ENSURE ACCESSIBLE GAPS
If you want a gap between the `Trigger` and the `Target`, do not style it on the `Target` directly - use a wrapper element inside it to style the tooltip (like in [the example](#tooltip)). **Otherwise, trying to move the cursor from the `Trigger` to the `Target` will close it**.
:::

### CSS Selectors

The root component (`Tooltip`) is purely logical and has no element to style, while the child components follow [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                         | Description                                                                                                                                                 |  For                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the tooltip. See [Floating UI](https://floating-ui.com/docs/tutorial). | <ul><li>`Target`</li></ul> |

## Accessibility

Resources: [APG Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

::: warning UNUSABLE ON TOUCH DEVICES

For a touch-friendly alternative check out [`<PeachyToggletip />`](/components/toggletip).

:::

### Keyboard interactions

| Key            | Action              |
| -------------- | ------------------- |
| <kbd>Esc</kbd> | Closes the tooltip. |

The tooltip stays open on hover, _unless_ there is a gap directly between the `Target` and `Trigger`, which there is a simple workaround for - see [Styling](#styling).
