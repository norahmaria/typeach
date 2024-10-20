### Classes

::: info `Day` RENDERS TWO ELEMENTS
The `Day` element renders a table cell with a button in it.
:::

Follows [our CSS classes convention](to:styling), with one additional selector for the table cell wrapper:

- `.peachy-date-picker__cell` for the table cell element inside `Day`.

### Selectors

| Selector                     | Description            | For                       |
| ---------------------------- | ---------------------- | ------------------------- |
| `[aria-pressed="<boolean>"]` | For a selected date.   | <ul><li>`Day`</li></ul>   |
| `[data-active="<boolean>"]`  | For a focused date.    | <ul><li>`Day`</li></ul>   |
| `:disabled`                  | For a disabled input.  | <ul><li>`Input`</li></ul> |
| `:read-only`                 | For a read-only input. | <ul><li>`Input`</li></ul> |
