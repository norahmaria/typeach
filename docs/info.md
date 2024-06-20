# Info

::: tip BROWSER SUPPORT
All components are manually tested with [VoiceOver](https://support.apple.com/guide/voiceover/welcome/mac) and [NVDA](https://www.nvaccess.org/)
in [Chrome](https://www.google.com/chrome/), [Safari](https://apps.apple.com/no/app/safari/id1146562112) and [Firefox](https://www.mozilla.org/en-US/firefox/).

If you test any of the components and spot any issues, I'd love to hear about it on [Github](https://github.com/norahmaria/typeach/issues) 💚

:::

## Styling

You can provide your own CSS classes for every component that renders an element with the class attribute, but alongside that - **every component gets attached a class that follows the [BEM](https://getbem.com/introduction/) convention**:

- `peachy-<component>` for a root component.
- `peachy-<component>__<component-child-name>` for any child components.

_There are some exceptions to this rule depending on the component, in which case the specific component's documentation will let you know._

### Animating

You should be able to wrap _most_ components inside Vue's built in component [`<Transition />`](https://vuejs.org/guide/built-ins/transition). The examples prefer to use pure CSS when possible for animations, so if a component it using pure CSS for animations, there might be a chance `<Transition />` still works, but it is not tested.

Native elements that appear and disappear - such as dialog and popover (which a lot of components here use), do not work with `<Transition />`, and have some limitations for animating them _out_ outside of Chromium based browsers.

### Icons

All icons used in the examples are from [heroicons](https://heroicons.com).

## Components are single HTML elements

**Components are a single HTML element**, to allow attributes to be passed to the HTML element. E.g. [`<PeachyDisclosure.Trigger />`](/components/disclosure#props-emits) does not need have a `disabled` prop - but if you add the attribute, it will be passed onto the button element inside the component.

There are some exceptions to this rule, in which case - read the documentation for the component.
