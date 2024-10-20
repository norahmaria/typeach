### Classes

Follows [our CSS classes convention](to:styling).
<br />

### Selectors

| Selector                             | Description                                | For                               |
| ------------------------------------ | ------------------------------------------ | --------------------------------- |
| `[role="'tree' \| 'group'"]`         | For selecting a root tree vs a child tree. | <ul><li>`Tree`</li> </ul>         |
| `[aria-multiselectable="<boolean>"]` | For if a tree is multiselect or not.       | <ul><li>`Tree`</li></ul>          |
| `[aria-level="<number>"]`            | The level of the item.                     | <ul><li>`Item`</li></ul>          |
| `[aria-selected="<number>"]`         | For the selected state.                    | <ul><li>`Item`</li></ul>          |
| `[aria-disabled="<boolean>"]`        | For a disabled or non-disabled item.       | <ul><li>`Item`</li></ul>          |
| `[aria-expanded]`                    | For an item with children.                 | <ul><li>`Item`</li></ul>          |
| `[aria-pressed="<boolean>"]`         | For the selected state for an indicator.   | <ul><li>`ItemIndicator`</li></ul> |
| `:focus`                             | For a focused/hovered item.                | <ul><li>`Item`</li></ul>          |
