::: warning READONLY
Native checkbox inputs do not offer a readonly state, and `aria-readonly` has spotty support. Setting the checkbox to readonly makes the input disabled with `aria-disabled` to keep it in the tab order, and manually prevents the input from being edited.

<br />

There is some disagreements if `disabled` conveys the right intent as a replacement for readonly, however, usually the solution people arrive at when they want a `readonly` checkbox is to make it disabled - so I figure this is a reasonable compromise.

<br />

**References:**

- [Why is aria-readonly allowed for checkboxes and radios?](https://github.com/w3c/aria/issues/1309#issue-676916400)
- [Provide a way to have disabled form controls to be submitted (was: readonly attribute)](https://github.com/whatwg/html/issues/2311)
  :::

### Keyboard interactions

| Key              | Action                |
| ---------------- | --------------------- |
| <kbd>Space</kbd> | Toggles the checkbox. |
