### Classes

Follows [our CSS classes convention](to:styling), with some extras:

- `.peachy-checkbox__child` is added for a checkbox with a parent.

- `.peachy-checkbox__parent` is added for a checkbox with children.

### Selectors

| Selector                                    | Description                    | For                           |
| ------------------------------------------- | ------------------------------ | ----------------------------- |
| `:checked`                                  | For a checked checkbox.        | <ul><li>`Input`</li></ul>     |
| `:disabled`                                 | For a disabled checkbox.       | <ul><li>`Input`</li></ul>     |
| `[data-readonly="<boolean>"]`               | For a read-only checkbox.      | <ul><li>`Input`</li></ul>     |
| `[data-state="boolean \| 'indeterminate'"]` | For the state of the checkbox. | <ul><li>`Indicator`</li></ul> |
