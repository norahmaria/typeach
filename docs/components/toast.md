# Toast

<br/>

<script lang="ts" setup>
  import Toast from './toast/Toast.vue'
  import './toast/toast.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Toast />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./toast/Toast.vue#snippet
<<< ./toast/toast.css
:::

## Anatomy

```vue
<template>
  <PeachyToast.Toast>
    <PeachyToast.Action />
    <PeachyToast.Close />
  </PeachyToast.Toast>
</template>

<script lang="ts" setup>
  import { PeachyToast } from "typeach";
</script>
```

## Props & Emits

### `Toast`

<br />

#### Props

| Name       |   Default   |    Type    | Description                                                                                                                               |
| ---------- | :---------: | :--------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| is         |    `div`    | `string?`  | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).           |
| assertive  |   `false`   | `boolean?` | The <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live">aria-live</a> attribute for the toast. |
| open       |   `false`   | `boolean?` |                                                                                                                                           |
| closeAfter | `undefined` | `number?`  |                                                                                                                                           |

<br />

#### Emits

| @           |  Payload  |
| ----------- | :-------: |
| update:open | `boolean` |

### `Action`

<br />

#### Props

| Name            | Default |   Type   | Description                                                                                                       |
| --------------- | :-----: | :------: | ----------------------------------------------------------------------------------------------------------------- |
| descriptiveText |         | `string` | A description describing an alternative route for performing this action if they are not able to reach the toast. |

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

## Accessibility

Resources: [APG Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/), Scott O'Hara's ["A toast to a11y toasts"](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html)

- If `closeAfter` is set and a user is interacting with the element - the toast will delay closing until the user is no longer interacting with it, the only exception is if the user clicked `Close` _or if you manually update the `open` property_.
