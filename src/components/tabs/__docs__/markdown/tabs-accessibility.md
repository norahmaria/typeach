### Keyboard interactions

| Key                                            | Action                                |
| ---------------------------------------------- | ------------------------------------- |
| <kbd>Space</kbd> or <kbd>↵</kbd> on `ListItem` | Opens the associated tab.             |
| <kbd>→</kbd> on a `ListItem`                   | Moves focus to the next tab item.     |
| <kbd>←</kbd> on a `ListItem`                   | Moves focus to the previous tab item. |
| <kbd>Home</kbd> on a `ListItem`                | Moves focus to the first tab item.    |
| <kbd>End</kbd> on a `ListItem`                 | Moves focus to the last tab item.     |

**Hover and keyboard interactions are synced.** _E.g. in the example tab, if you hover over "Tab 1", and then press arrow right - the focus will move to "Tab 2"._

### Automatic rotating with `interval`

::: warning ALLOW USERS TO STOP AUTOMATIC ROTATION
If you set an interval, you need to provide a way for the user to stop the automatic rotation.
:::

When `Tabs` has an interval, it will automatically loop through the tabs - but pause the loop when a user is hovering or has focus inside `Tabs`.
