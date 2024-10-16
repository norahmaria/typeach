### Classes

The root component (`Dialog`) is purely logical, and has no element to style - otherwise the child components follow [our CSS classes convention](to:styling).

### Selectors

The [native dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) (`Target`) already has some really useful selectors (e.g. `[open]`, `::backdrop`). Beyond these we've just added a `data-open` attribute to the trigger itself, so you can style it based on if the dialog is open or not.
