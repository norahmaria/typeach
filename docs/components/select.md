# Select

::: info DO YOU NEED A CUSTOM STYLED SELECT?
Custom select elements are infamously inaccessible. If you can use a native select instead, please do so!
There's a great article on this by Sarah Higley - [`<select> your poison`](https://sarahmhigley.com/writing/select-your-poison/).
:::

<br/>

<script lang="ts" setup>
  import Select from './select/Select.vue'
  import './select/select.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Select />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./select/Select.vue#snippet
<<< ./select/select.css
:::

## Anatomy

Radio does use `<PeachyInput.Label />`, not be be confused with it's own `Label` component, which is used as a label inside the list of options.

```vue
<template>
  <PeachyInput.Input>
    <PeachySelect.Input>
      <PeachyInput.Label />

      <PeachySelect.Trigger />

      <PeachySelect.Target>
        <PeachySelect.List>
          <PeachySelect.Label />
          <PeachySelect.Separator />

          <PeachySelect.Item>
            <PeachySelect.Indicator />
          </PeachySelect.Item>
        </PeachySelect.List>
      </PeachySelect.Target>
    </PeachySelect.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { PeachyInput, PeachySelect } from "typeach";
</script>
```

::: warning ACCESSIBILITY FOR AN EMPTY SELECT
The component clears the values when pressing <kbd>Backspace</kbd> or <kbd>Delete</kbd>, however this is not a recognized pattern for clearing a listbox, and is not available on devices not connected to a keyboard (e.g. mobile) - so it is important to communicate this shortcut to the user if you want them to be aware of it, and offer an alternative.

The recommended approach is to **have one of the options represent no value, such as a "None" option.** In [the example](#select), if I detect that the selected item is "none", I clear the value.
:::

## Props & Emits

### `Input`

::: info DISABLED
There is no disabled state for the select. You're expected to disable the `Trigger` directly.
:::

#### Props

| Name        | Default  |    Type     |
| ----------- | :------: | :---------: |
| selectedIds |   `[]`   | `string[]?` |
| multiSelect | `false`  | `boolean?`  |
| readonly    |  `false` |  `boolean?` |

#### Emits

| @                   |  Payload   |
| ------------------- | :--------: |
| update:selected-ids | `string[]` |
| validate            | `string[]` |
| clear-validation    |            |

<hr/>

### `Trigger`

<br/>

#### Props

| Name     | Default  |    Type     |
| -------- | :------: | :---------: |
| disabled |  `false` |  `boolean?` |

<hr/>

### `Item`

<br/>

#### Props

| Name     | Default |    Type    |
| -------- | :-----: | :--------: |
| id       |         |  `string`  |
| disabled | `false` | `boolean?` |

<hr/>

### `Separator`

<br/>

#### Props

| Name | Default |   Type    | Description                                                                                                                     |
| ---- | :-----: | :-------: | ------------------------------------------------------------------------------------------------------------------------------- |
| is   |  `hr`   | `string?` | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components). |

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                      | Description                                   |  For                          |
| ----------------------------- | --------------------------------------------- | ----------------------------- |
| `[aria-selected="<boolean>"]` | For a selected item.                          | <ul><li>`Item`</li></ul>      |
| `[data-active="<boolean>"]`   | For if an item is focused or not.             | <ul><li>`Item`</li></ul>      |
| `[data-readonly="<boolean>"]` | For if an item that is readonly.              | <ul><li>`Item`</li></ul>      |
| `[aria-disabled="<boolean>"]` | For an item's disabled and/or readonly state. | <ul><li>`Item`</li></ul>      |
| `[data-selected="<boolean>"]` | For a selected item's indicator.              | <ul><li>`Indicator`</li></ul> |
| `[data-active="<boolean>"]`   | For if the select is active or not.           | <ul><li>`Trigger`</li></ul>   |
| `[data-empty="<boolean>"]`    | For when there is no selection.               | <ul><li>`Trigger`</li></ul>   |

## Accessibility

Resources: [APG Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/), [APG Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboardinteraction), Webkit Bugzilla - [`activedescendant` on combobox not honored](https://bugs.webkit.org/show_bug.cgi?id=167671) and [`aria-selected` options in listboxes not announced](https://bugs.webkit.org/show_bug.cgi?id=209076) - _see below for a more comprehensive list_.

Due to a [known issue in Safari](https://bugs.webkit.org/show_bug.cgi?id=167671) with the `aria-activedescendant` attribute, the component actually does move focus, rather than rely solely on the attribute.

::: warning ACCESSIBILITY FOR AN EMPTY SELECT
The component clears the values when pressing <kbd>Backspace</kbd> or <kbd>Delete</kbd>, however this is not a recognized pattern for clearing a listbox, and is not available on devices not connected to a keyboard (e.g. mobile) - so it is important to communicate this shortcut to the user if you want them to be aware of it, and offer an alternative.

The recommended approach is to **have one of the options represent no value, such as a "None" option.** In [the example](#select), if I detect that the selected item is "none", I clear the value.
:::

### Keyboard interactions

### Single select

| Key                                                                                             | Action                                                                                                            |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> or <kbd>↵</kbd> or <kbd>↓</kbd> or <kbd>↑</kbd> on `Trigger` when not disabled | First time it opens, it focuses the first item - every other times, it focuses on the most recently focused item. |
| <kbd>Alt</kbd> + <kbd>↓</kbd> on `Trigger` when not disabled                                    | First time it opens, it focuses the first item - every other times, it focuses on the most recently focused item. |
| <kbd>Home</kbd> on `Trigger`                                                                    | Opens and moves focus to the first item.                                                                          |
| <kbd>End</kbd> on `Trigger`                                                                     | Opens and moves focus to the last item.                                                                           |
| <kbd>A-Z</kbd> or <kbd>a-z</kbd> on `Trigger`                                                   | Opens and goes through items starting with the letter typed, or searches for the first item matching the search.  |
| <kbd>↓</kbd> on `Item`                                                                          | Moves focus to the next item.                                                                                     |
| <kbd>↑</kbd> on `Item`                                                                          | Moves focus to the previous item.                                                                                 |
| <kbd>Space</kbd> or <kbd>Enter</kbd> or <kbd>Alt</kbd> + <kbd>↑</kbd> on `Item`                 | Selects the item, closes the select and returns focus back to it's trigger.                                       |
| <kbd>Home</kbd> on `Item`                                                                       | Moves focus to the first item.                                                                                    |
| <kbd>End</kbd> on `Item`                                                                        | Moves focus to the last item.                                                                                     |
| <kbd>Tab</kbd> on `Item`                                                                        | Selects the item and closes the select.                                                                           |
| <kbd>A-Z</kbd> or <kbd>a-z</kbd> on `Item`                                                      | Focuses through items starting with the letter typed, or searches for the first item matching the search.         |
| <kbd>esc</kbd> on `Item`                                                                        | Closes the select and returns focus back to it's trigger.                                                         |

### Multi select

Extends the single select navigation, except - keys to select now toggles the item, and selecting an item does _not_ close the select, and <kbd>Alt</kbd> + <kbd>↑</kbd> is ignored.

| Key                                                               | Action                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <kbd>Shift</kbd> + <kbd>↓</kbd> on `Item`                         | Moves focus to and toggles the next item.                                      |
| <kbd>Shift</kbd> + <kbd>↑</kbd> on `Item`                         | Moves focus to and toggles the previous item.                                  |
| <kbd>Shift</kbd> + <kbd>Space</kbd> on `Item`                     | Selects continuously from the most recently selected item to the focused item. |
| <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>Home</kbd> on `Item` | Selects the focused item and all items upwards.                                |
| <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>End</kbd> on `Item`  | Selects the focused item and all items downwards.                              |
| <kbd>Control</kbd> + <kbd>A</kbd> `Item`                          | Toggles select all on and off.                                                 |

**Hover and keyboard interactions are synced.**

### Resources

- APG

  - [APG Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
  - [APG Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboardinteraction)

- Webkit Bugzilla

  - [`activedescendant` on combobox not honored correctly in VoiceOver](https://bugs.webkit.org/show_bug.cgi?id=167671)
  - [`aria-selected` options in listboxes not properly announced](https://bugs.webkit.org/show_bug.cgi?id=209076)

- [`<select> your poison`](https://sarahmhigley.com/writing/select-your-poison/) by Sarah Higley
- [Select component](https://www.radix-ui.com/primitives/docs/components/select) by Radix
