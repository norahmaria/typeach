Due to a [known issue in Safari](https://bugs.webkit.org/show_bug.cgi?id=167671) with the `aria-activedescendant` attribute, the component actually does move focus, rather than rely solely on the attribute. _Update: This bug has recently been fixed and in the near future we will stop changing the actual focus_.

### Keyboard interactions

#### Single select

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

#### Multi select

Extends the single select navigation, except the keys that used to select an item now toggles the item, and selecting an item does _not_ close the select, and <kbd>Alt</kbd> + <kbd>↑</kbd> is ignored.

| Key                                                               | Action                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <kbd>Shift</kbd> + <kbd>↓</kbd> on `Item`                         | Moves focus to and toggles the next item.                                      |
| <kbd>Shift</kbd> + <kbd>↑</kbd> on `Item`                         | Moves focus to and toggles the previous item.                                  |
| <kbd>Shift</kbd> + <kbd>Space</kbd> on `Item`                     | Selects continuously from the most recently selected item to the focused item. |
| <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>Home</kbd> on `Item` | Selects the focused item and all items upwards.                                |
| <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>End</kbd> on `Item`  | Selects the focused item and all items downwards.                              |
| <kbd>Control</kbd> + <kbd>A</kbd> `Item`                          | Toggles select all on and off.                                                 |

**Hover and keyboard interactions are synced.**
