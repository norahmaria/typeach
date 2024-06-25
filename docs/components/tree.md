# Tree

::: info TREE MUST BE CONTROLLED
The `Tree` component only deals with keyboard navigation, opening and closing items,
and letting you know _when_ to toggle an item's selected state, but does not deal with the selection itself.

This is done because an item's children are not rendered until you open it - meaning it would be difficult for
the component to know the entire state of the tree.
:::
<br/>

<script lang="ts" setup>
 import Tree from './tree/Tree.vue'
 import AsyncTree from './tree/AsyncTree.vue'
 import './tree/tree.css' 
</script>

<ClientOnly>
  <ComponentPreview>
    <Tree />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./tree/Tree.vue#snippet
<<< ./tree/tree.css
:::

## Anatomy

```vue
<template>
  <PeachyTree.Tree>
    <PeachyTree.item>
      <PeachyTree.ItemLabel />
      <PeachyTree.ItemIndicator />

      <template #children />
    </PeachyTree.item>
  </PeachyTree.Tree>
</template>

<script lang="ts" setup>
  import { PeachyTree } from "typeach";
</script>
```

### Usage

It is recommended to let the user know when a parent has any children selected. You'll see in [the example](#tree) we've done this by:

- Using the `ItemIndicator` to communicate this visually.

- Using [`<PeachyVisuallyHidden />`](/components/visually-hidden) inside `ItemLabel` for screen readers.

  - For the screen reader text it is preferable to only inform when a child is selected, and not when no children are selected, to avoid repetition.
  - `ItemIndicator` is hidden from screen readers, so placing the information there would be useless.

- The children slot should always be rendered when the item has children - even if they're not loaded yet. And it should not render for a childless item.

## Props & Emits

### `Tree`

<br/>

#### Props

| Name        | Default |   Type    | Description                                                 |
| ----------- | :-----: | :-------: | ----------------------------------------------------------- |
| count       |         | `number`  |                                                             |
| multiSelect | `false` | `boolean` | Every child tree uses the `multiSelect` from the root tree. |

<hr/>

### `Item`

<br/>

#### Props

| Name     | Default |   Type    | Description                                                             |
| -------- | :-----: | :-------: | ----------------------------------------------------------------------- |
| selected |         | `boolean` |                                                                         |
| id       |         | `string`  |                                                                         |
| position |         | `number`  | The position of the item in the list.                                   |
| disabled | `false` | `boolean` | Will prevent `toggle` from emitting, but still allows for opening item. |

#### Emits

| @       |  Payload  | Description                                              |
| ------- | :-------: | -------------------------------------------------------- |
| @toggle | `boolean` | Triggered when the selection for the item should toggle. |
| @open   |           | Triggered when opened.                                   |

### `ItemLabel`

If you wish to also toggle an item when clicking the item, you can listen for `click` events on the `ItemLabel`.

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).
<br />

#### State selectors

| Selector                             | Description                                |  For                              |
| ------------------------------------ | ------------------------------------------ | --------------------------------- |
| `[role=<"TreeRole>"]`                | For selecting a root tree vs a child tree. | <ul><li>`Tree`</li> </ul>         |
| `[aria-multiselectable="<boolean>"]` | For if a tree is multiselect or not.       | <ul><li>`Tree`</li></ul>          |
| `[aria-level="<number>"]`            | The level of the item.                     | <ul><li>`Item`</li></ul>          |
| `[aria-selected="<number>"]`         | For the selected state.                    | <ul><li>`Item`</li></ul>          |
| `[aria-disabled="<boolean>"]`        | For a disabled or non-disabled item.       | <ul><li>`Item`</li></ul>          |
| `[aria-expanded]`                    | For an item with children.                 | <ul><li>`Item`</li></ul>          |
| `[aria-pressed="<boolean>"]`         | For the selected state for an indicator.   | <ul><li>`ItemIndicator`</li></ul> |
| `:focus`                             | For a focused/hovered item.                | <ul><li>`Item`</li></ul>          |

```ts
export type TreeRole = "tree" | "group";
```

## Accessibility

Resources: [APG File Directory Treeview Example Using Declared Properties](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview1b/), [React Accessible Treeview](https://github.com/dgreene1/react-accessible-treeview)

### Keyboard interactions

| Key                                           | Action                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <kbd>Space</kbd> or <kbd>↵</kbd> on an `Item` | Selects the item.                                                                                                                          |
| <kbd>↓</kbd> on `Item`                        | Moves focus to the next item without opening/closing any items.                                                                            |
| <kbd>↑</kbd> on `Item`                        | Moves focus to the previous item without opening/closing any items.                                                                        |
| <kbd>→</kbd> on parent `Item`                 | If closed, opens the item otherwise moves focus to first child.                                                                            |
| <kbd>←</kbd> on `Item`                        | Focus moves to the parent if there is one, otherwise if the item is a parent, it will close itself.                                        |
| <kbd>Home</kbd> on `Item`                     | Moves focus to the first item without opening/closing any items.                                                                           |
| <kbd>End</kbd> on `Item`                      | Moves focus to the last item without opening/closing any items.                                                                            |
| <kbd>AZ</kbd> or <kbd>az</kbd> on `Item`      | Loops through items starting with the letter typed, or searches for the first item matching the search. Without opening/closing any items. |
| <kbd>\*</kbd>                                 | Opens all items on the same level.                                                                                                         |

## Asynchronous

<br />

<ClientOnly>
  <ComponentPreview>
    <AsyncTree />
  </ComponentPreview>
</ClientOnly>

<<< tree/AsyncTree.vue#snippet{8-13,24-27,36}
