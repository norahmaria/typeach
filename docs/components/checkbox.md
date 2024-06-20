# Checkbox

<br />

<script lang="ts" setup>
  import Checkbox from './checkbox/Checkbox.vue'
  import CheckboxGroup from './checkbox/CheckboxGroup.vue'
  import IndeterminateCheckbox from './checkbox/IndeterminateCheckbox.vue'
  import './checkbox/checkbox.css'
  import './checkbox/checkbox-group.css'
  import './checkbox/indeterminate-checkbox.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Checkbox />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./checkbox/Checkbox.vue#snippet
<<< ./checkbox/checkbox.css
:::

## Anatomy

```vue
<template>
  <!-- Single checkbox --->
  <PeachyInput.Input>
    <PeachyCheckbox.Input>
      <!-- #before or #after -->
      <template #after>
        <PeachyCheckbox.Indicator>
          <template #indeterminate />
        </PeachyCheckbox.Indicator>

        <PeachyInput.Label />
      </template>
    </PeachyCheckbox.Input>
  </PeachyInput.Input>

  <!-- Checkbox group --->
  <PeachyInput.Group>
    <PeachyInput.GroupLabel />

    <PeachyInput.Input>
      <PeachyCheckbox.Input>
        <!-- #before or #after -->
        <template #after>
          <PeachyCheckbox.Indicator>
            <template #indeterminate />
          </PeachyCheckbox.Indicator>

          <PeachyInput.Label />
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>
  </PeachyInput.Group/>
</template>

<script lang="ts" setup>
  import { PeachyCheckbox, PeachyInput } from "typeach";
</script>
```

**A checkbox can be nested as many times as needed.** `Indicator` has two slots - `default` and `indeterminate`, which only renders when the state is `true` or `indeterminate`.

## Props & Emits

### `Input`

::: warning DO NOT CONTROL A PARENT CHECKBOX
You should never manually set a parent checkbox's state - they are there as helpers for mass-edits, but are not intended to be controlled. A parent changes depending on it's children, so you might get unexpected results trying to override this.
:::

#### Props

| Name     | Default |       Type       | Description                                                                                                      |
| -------- | :-----: | :--------------: | ---------------------------------------------------------------------------------------------------------------- |
| state    | `false` | `CheckboxState?` | Should only be used for non-parent checkboxes.                                                                   |
| disabled | `false` |    `boolean?`    | _A parent will also become disabled if any of it's children are disabled._                                       |
| readOnly | `false` |    `boolean?`    | _A parent will also become readonly if any of it's children are readonly/disabled._                              |
| required | `false` |    `boolean?`    | The component only labels it as required with `aria-required` and does not deal with any error messages for you. |

#### Emits

| @                |     Payload      |
| ---------------- | :--------------: |
| update:state     | `CheckboxState`  |
| validate         | `CheckboxState?` |
| clear-validation |                  |

```ts
export type CheckboxState = boolean | "indeterminate";
```

## Styling

::: info `INPUT` HAS DEFAULT STYLING
The `Input` element has a style of `appearance: none`, to allow styling it yourself. You should however style the input and `Indicator` to be aligned, so that the click-area lines up (see [the example](#checkbox)).
:::

### CSS Selectors

Follows [our CSS classes convention](/info#styling), with some extras:

- `.peachy-checkbox__child` is added for a checkbox with a parent.

- `.peachy-checkbox__parent` is added for a checkbox with children.

<br />

#### State selectors

| Selector                         | Description                    |  For                          |
| -------------------------------- | ------------------------------ | ----------------------------- |
| `:checked`                       | For a checked checkbox.        | <ul><li>`Input`</li></ul>     |
| `:disabled`                      | For a disabled checkbox.       | <ul><li>`Input`</li></ul>     |
| `[data-readonly="<boolean>"]`    | For a read-only checkbox.      | <ul><li>`Input`</li></ul>     |
| `[data-state="<CheckboxState>"]` | For the state of the checkbox. | <ul><li>`Indicator`</li></ul> |

```ts
export type CheckboxState = boolean | "indeterminate";
```

## Accessibility

Resources: [Styled HTML Checkboxes](https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox/), [One last time: custom styling radio buttons and checkboxes](https://www.scottohara.me/blog/2021/09/24/custom-radio-checkbox-again.html), [APG Checkbox (Mixed State)](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/)

::: warning READONLY
Native checkbox inputs do not offer a readonly state, and `aria-readonly` has spotty support. So setting the checkbox to readonly makes the input disabled with `aria-disabled`to keeps it in the tab order, and manually prevents the input from being edited.

There is some disagreements if `disabled` conveys the right intent as a replacement for readonly, however, usually the solution people arrive at when they want a `readonly` checkbox is to make it disabled - so I figure this is a reasonable compromise.

References: [Why is aria-readonly allowed for checkboxes and radios?](https://github.com/w3c/aria/issues/1309#issue-676916400), [Provide a way to have disabled form controls to be submitted (was: readonly attribute)](https://github.com/whatwg/html/issues/2311)
:::

### Keyboard interactions

| Key              | Action                |
| ---------------- | --------------------- |
| <kbd>Space</kbd> | Toggles the checkbox. |

## Grouped checkboxes

<ClientOnly>
  <ComponentPreview>
      <CheckboxGroup />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./checkbox/CheckboxGroup.vue#snippet
<<< ./checkbox/checkbox-group.css [checkbox-group.css (extends checkbox.css)]
:::

## Indeterminate checkboxes

::: warning DO NOT CONTROL A PARENT CHECKBOX
You should never manually set a parent checkbox's state - they are there as helpers for mass-edits, but are not intended to be controlled. A parent changes depending on it's children, so you might get unexpected results trying to override this.
:::

<ClientOnly>
  <ComponentPreview>
      <IndeterminateCheckbox />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./checkbox/IndeterminateCheckbox.vue#snippet
<<< ./checkbox/indeterminate-checkbox.css [indeterminate-checkbox.css (extends checkbox.css + checkbox-group.css)]
:::
