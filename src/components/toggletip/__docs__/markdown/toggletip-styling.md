- **`Target` is always rendered - it's content is not.** `Target` will always render so that it properly announces for screen readers - you can use a wrapper element inside it to style the toggletip when visible.

### Classes

The root component (`Toggletip`) is purely logical and has no element to style, while the child components follow [our CSS classes convention](to:styling).

### Selectors

| Selector                         | Description                                                                                                                                     | For      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the toggletip. See [Floating UI](https://floating-ui.com). | `Target` |
