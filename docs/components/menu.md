# Menu

<br/>

<script lang="ts" setup>
  import Menu from './menu/Menu.vue'
  import './menu/menu.css'
</script>

<ClientOnly>
  <ComponentPreview>
    <Menu />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./menu/Menu.vue#snippet
<<< ./menu/menu.css
:::

## Anatomy

```vue
<template>
  <PeachyMenu.Menu>
    <PeachyMenu.Trigger />

    <PeachyMenu.List>
      <PeachyMenu.Item />
      <PeachyMenu.Label />
      <PeachyMenu.CheckboxItem />
      <PeachyMenu.Menu />
      <PeachyMenu.Separator />

      <PeachyMenu.RadioGroup>
        <PeachyMenu.Label />
        <PeachyMenu.RadioItem />
      </PeachyMenu.RadioGroup>
    </PeachyMenu.List>
  </PeachyMenu.Menu>
</template>

<script lang="ts" setup>
  import { PeachyMenu } from "typeach";
</script>
```

**A menu can be nested as many times as needed** - this means if you make a component based on `Menu`, you can use it in any context and it will automatically adjust to be a menu or submenu depending on where you place it.

### Structural notes

A trigger's menu reference is it's own menu.

<figure>
  <img alt="A trigger is logically inside itself, meaning any reference to 'menu' in it, references it's own menu and not actually the menu it is in." src="/assets/menu-structure.png" />
  <figcaption>Illustration made using <a href="https://excalidraw.com">Excalidraw</a>.</figcaption>
</figure>

## Props & Emits

### `Trigger`

<br />

#### Props

| Name     |    Type    |
| -------- | :--------: |
| disabled | `boolean?` |

<hr/>

### `Item`

<br />

#### Props

| Name     |    Type    |
| -------- | :--------: |
| disabled | `boolean?` |

#### Emits

| @     |   Payload    |
| ----- | :----------: |
| click | `MouseEvent` |

<hr/>

### `CheckboxItem`

<br />

#### Props

| Name     |    Type    |
| -------- | :--------: |
| checked  | `boolean`  |
| disabled | `boolean?` |

#### Emits

| @              |  Payload  |
| -------------- | :-------: |
| update:checked | `boolean` |

<hr/>

### `RadioGroup`

<br />

#### Props

| Name  | Type |
| ----- | :--: |
| value | `T`  |

#### Emits

| @            | Payload |
| ------------ | :-----: |
| update:value |   `T`   |

<hr/>

### `RadioItem`

<br />

##### Props

| Name     |    Type    |
| -------- | :--------: |
| value    |    `T`     |
| disabled | `boolean?` |

<hr/>

### `Separator`

<br />

#### Props

| Name | Default |   Type    | Description                                                                                                                     |
| ---- | :-----: | :-------: | ------------------------------------------------------------------------------------------------------------------------------- |
| is   |  `hr`   | `string?` | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components). |

## Styling

### CSS Selectors

The root component (`Menu`) and `RadioGroup` are purely logical and have no elements to style, otherwise _most_ of the child components follow [our CSS classes convention](/info#styling), with a couple extras and exceptions:

- `.peachy-menu__item` is not just added to `Item`, but to any action items:

  - `CheckboxItem`
  - `RadioItem`
  - `Trigger` (only when it's a submenu's trigger)

- `.peachy-menu__sub-trigger` is added for a submenu's trigger.

- `.peachy-menu__trigger` is added for the root trigger.

<br />

#### State selectors

| Selector                         | Description                                                                                                                                              |  For                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `[aria-disabled="<boolean>"]`    | For disabled items.                                                                                                                                      | <ul><li>`Trigger`</li> <li>`Item`</li> <li>`CheckboxItem`</li> <li>`RadioItem`</li></ul> |
| `[aria-checked="<boolean>"]`     | For checked state.                                                                                                                                       | <ul><li>`CheckboxItem`</li> <li>`RadioItem`</li></ul>                                    |
| `:focus`                         | For the item currently selected.                                                                                                                         | <ul><li>`Trigger`</li> <li>`Item`</li> <li>`CheckboxItem`</li> <li>`RadioItem`</li></ul> |
| `:has(+ :popover-open)`          | For a trigger with an open menu.                                                                                                                         | <ul><li>`Trigger`</li></ul>                                                              |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the menu. See [Floating UI](https://floating-ui.com/docs/tutorial). | <ul><li>`Target`</li></ul>                                                               |

## Accessibility

Resources: [APG Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) with [focus](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/), Material UI [issue #33603](https://github.com/mui/material-ui/issues/33603) - _see below for a more comprehensive list_.

### Keyboard interactions

| Key                                                                     | Action                                                                                                  |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> or <kbd>↵</kbd> on the root `Trigger`                  | Opens the menu on the first item.                                                                       |
| <kbd>↓</kbd> on the root `Trigger` when not disabled                    | Opens the menu on the first item.                                                                       |
| <kbd>↑</kbd> on the root `Trigger` when not disabled                    | Opens the menu on the last item.                                                                        |
| <kbd>↵</kbd> on a submenu's `Trigger` when not disabled                 | Opens the submenu on the first item.                                                                    |
| <kbd>→</kbd> on a submenu's `Trigger` when not disabled                 | Opens the submenu on the first item.                                                                    |
| <kbd>←</kbd> when focus is <i>inside</i> a submenu                      | Closes the submenu and returns focus to it's trigger.                                                   |
| <kbd>↵</kbd> on `Item`, `CheckboxItem` or `RadioItem` when not disabled | Selects item, closes the menu and returns focus back to the root trigger.                               |
| <kbd>↓</kbd> on items or a submenu's `Trigger`                          | Moves focus to the next item.                                                                           |
| <kbd>↑</kbd> on items or a submenu's `Trigger`                          | Moves focus to the previous item.                                                                       |
| <kbd>Home</kbd> on items or a submenu's `Trigger`                       | Moves focus to the first item.                                                                          |
| <kbd>End</kbd> on items or a submenu's `Trigger`                        | Moves focus to the last item.                                                                           |
| <kbd>A-Z</kbd> or <kbd>a-z</kbd> on items or a submenu's `Trigger`      | Loops through items starting with the letter typed, or searches for the first item matching the search. |
| <kbd>esc</kbd>                                                          | Closes the menu and returns focus back to the root trigger.                                             |

**Hover and keyboard interactions are synced.** _E.g. in the [example menu](#menu), if you hover over "Menu item", and then press arrow down - the focus will move to "Submenu"_.

### Resources

- APG - [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- MDN

  - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
  - [ARIA: menuitem role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitem_role)
  - [ARIA: menuitemradio role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemradio_role)
  - [ARIA: menuitemcheckbox role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menuitemcheckbox_role)

- OpenUI

  - [Popover API](https://open-ui.org/components/popover.research.explainer/)
  - [focusgroup](https://open-ui.org/components/focusgroup.explainer/)

- Hidde - [On popover accessibility: what the browser does and doesn’t do](https://hidde.blog/popover-accessibility/)
- Melanie Sumner - [Using the Popover API (accessibly)](https://codepen.io/melsumner/full/VwNmYLY)
- Material UI - **Issue #33603** [Disabled menu items should be focusable with keyboard](https://github.com/mui/material-ui/issues/33603)
- Radix UI Primitives - [Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#accessibility)
- Headless UI - [Menu](https://headlessui.com/v1/react/menu)
