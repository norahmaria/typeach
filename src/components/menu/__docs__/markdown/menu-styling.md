### Classes

The root component (`Menu`) and `RadioGroup` are purely logical and have no elements to style, otherwise _most_ of the child components follow [our CSS classes convention](to:styling), with a couple extras and exceptions:

- `.peachy-menu__item` is not just added to `Item`, but to any action items:

  - `CheckboxItem`
  - `RadioItem`
  - `Trigger` (only when it's a submenu's trigger)

- `.peachy-menu__sub-trigger` is added for a submenu's trigger.

- `.peachy-menu__trigger` is added for the root trigger.

### Selectors

| Selector                         | Description                                                                                                                                | Component                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `[aria-disabled="<boolean>"]`    | For disabled items.                                                                                                                        | <ul><li>`Trigger`</li> <li>`Item`</li> <li>`CheckboxItem`</li> <li>`RadioItem`</li></ul> |
| `[aria-checked="<boolean>"]`     | For checked state.                                                                                                                         | <ul><li>`CheckboxItem`</li> <li>`RadioItem`</li></ul>                                    |
| `:focus`                         | For the item currently selected.                                                                                                           | <ul><li>`Trigger`</li> <li>`Item`</li> <li>`CheckboxItem`</li> <li>`RadioItem`</li></ul> |
| `:has(+ :popover-open)`          | For a trigger with an open menu.                                                                                                           | <ul><li>`Trigger`</li></ul>                                                              |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the menu. See [Floating UI](https://floating-ui.com). | <ul><li>`Target`</li></ul>                                                               |
