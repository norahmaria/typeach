You should be able to wrap _most_ components inside Vue's built in component [`Transition`](https://vuejs.org/guide/built-ins/transition). We prefer pure CSS in the examples though - so if an example is using CSS for transitions, there's still a chance that `Transition` works, but it's just not been tested.

Native elements that appear and disappear - such as dialog and popover (which a lot of components use), do not work with the `Transition` element, and have some limitations for animating them _out_ (outside of Chromium based browsers).
