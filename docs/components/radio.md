# Radio

<br/>

<script lang="ts" setup>
  import Radio from './radio/Radio.vue'
  import './radio/radio.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Radio />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./radio/Radio.vue#snippet
<<< ./radio/radio.css
:::

## Anatomy

Radio does not use `<PeachyInput.Label />`, but rather `InputLabel` for the group, and `Label` for individual radios.

```vue
<template>
  <PeachyInput.Input>
    <PeachyRadio.Input>
      <template #before />

      <PeachyRadio.InputLabel />

      <PeachyRadio.Radio>
        <PeachyRadio.Indicator />
        <PeachyRadio.Label />
      </PeachyRadio.Radio>

      <template #after />
    </PeachyRadio.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyRadio } from "typeach";
</script>
```

`Indicator` has a slot, which only renders when the radio is checked.

## Props & Emits

### `Input`

<br/>

#### Props

| Name     | Default |    Type    |
| -------- | :-----: | :--------: |
| selected |         | `string?`  |
| disabled | `false` | `boolean?` |
| readOnly | `false` | `boolean?` |

#### Emits

| @                | Payload  |
| ---------------- | :------: |
| update:selected  | `string` |
| validate         | `string` |
| clear-validation |          |

<hr/>

### `Radio`

<br/>

#### Props

| Name     | Default |    Type    |
| -------- | :-----: | :--------: |
| value    |         |  `string`  |
| disabled | `false` | `boolean?` |
| readOnly | `false` | `boolean?` |

## Styling

::: info `INPUT` HAS DEFAULT STYLING
The `Input` element has a style of `appearance: none`, to allow styling it yourself. You should however style the input and `Indicator` to be aligned, so that the click-area lines up (see [the example](#radio)).
:::

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                      | Description            |  For                          |
| ----------------------------- | ---------------------- | ----------------------------- |
| `:checked`                    | For a checked radio.   | <ul><li>`Input`</li></ul>     |
| `:disabled`                   | For a disabled radio.  | <ul><li> `Input`</li></ul>    |
| `[data-readonly="<boolean>"]` | For a read-only radio. | <ul><li>`Input`</li></ul>     |
| `[data-checked="<boolean>"]`  | For the checked state. | <ul><li>`Indicator`</li></ul> |

## Accessibility

Resources: [One last time: custom styling radio buttons and checkboxes](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html)

::: warning READONLY
Native radio inputs do not offer a readonly state, and `aria-readonly` has spotty support. So setting the radios to readonly makes their input disabled with `aria-disabled`to keeps it in the tab order, and manually prevents the input from being edited.

There is some disagreements if `disabled` conveys the right intent as a replacement for readonly, however, usually the solution people arrive at when they want a `readonly` radio is to make it disabled - so I figure this is a reasonable compromise.

References: [Why is aria-readonly allowed for checkboxes and radios?](https://github.com/w3c/aria/issues/1309#issue-676916400), [Provide a way to have disabled form controls to be submitted (was: readonly attribute)](https://github.com/whatwg/html/issues/2311)
:::

### Keyboard interactions

| Key                       | Action                                            |
| ------------------------- | ------------------------------------------------- |
| <kbd>↑</kbd> <kbd>←</kbd> | Moves focus to the previous radio and selects it. |
| <kbd>↓</kbd> <kbd>→</kbd> | Moves focus to the next radio and selects it.     |
