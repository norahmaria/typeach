::: warning Ensure accessible gaps.
If you want a gap between the `Trigger` and the `Target`, do not style it on the `Target` directly - use a wrapper element inside it. **Otherwise moving the cursor between them will close the tooltip**.
:::

### Classes

The root component (`Tooltip`) is purely logical and has no element to style, while the child components follow [our CSS classes convention](to:styling).

### Selectors

| Selector                         | Description                                                                                                                                   | For      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `[data-placement="<Placement>"]` | The actual rendered [placement](https://floating-ui.com/docs/tutorial#placements) of the tooltip. See [Floating UI](https://floating-ui.com). | `Target` |
