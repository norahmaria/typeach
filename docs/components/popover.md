# Popover Component

_For visual examples refer to [Menu](/components/menu) and [Tooltip](/components/tooltip)._

Popover uses [Floating UI](https://floating-ui.com/docs/getting-started) to automatically place an element relative to another element within the screen, and repositions it when the viewport size changes or the page scrolls.

## Anatomy

```vue
<template>
  <PeachyPopover.Popover>
    <PeachyPopover.Trigger />

    <PeachyPopover.Target>
      <slot />
    </PeachyPopover.Target>
  </PeachyPopover.Popover>
</template>

<script lang="ts" setup>
  import { PeachyPopover } from "typeach";
</script>
```

A popover can be nested as many times as needed.

## Props & Emits

### `Popover`

<br />

#### Props

| Name  | Default |    Type    | Description                                                                          |
| ----- | :-----: | :--------: | ------------------------------------------------------------------------------------ |
| hover | `false` | `boolean?` | When set to `true`, the target will appear on hover and focus, rather than on click. |

<hr/>

### `Trigger`

<br />

#### Props

| Name        |  Default   |             Type             | Description                                                                                                                                                                                                                                 |
| ----------- | :--------: | :--------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| is          |   `div`    |          `string?`           | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components). Will only be applied if `nonNative` is `true`, as the popovertarget attribute is only supported by buttons. |
| nonNative\* |  `false`   |          `boolean?`          | When set to `true`, the popovertarget attribute is not added to the element.                                                                                                                                                                |
| action      | `"toggle"` | `"toggle"` `"show"` `"hide"` | Sets the [popovertargetaction](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/popoverTargetAction) attribute.                                                                                                            |

::: info NONNATIVE CAVEAT
If you're using `nonNative` and you want a gap between the `Trigger` and `Target` - to prevent the target disappearing when a user moves the cursor between them, you should create a wrapper element around the `<slot />` which you can style with paddings to create an accessible gap.
:::

### `Target`

<br />

#### Props

| Name       |  Default   |     Type     | Description                                                                                                                                                 |
| ---------- | :--------: | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| is         |  `"div"`   |  `string?`   | The is attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).                             |
| modal      |  `false`   |  `boolean?`  | When set to `true`, it sets the popover attribute to "manual", meaning clicking outside the popover and pressing <kbd>Escape</kbd> won't close the popover. |
| hardEscape |  `false`   |  `boolean?`  | When set to `true`, pressing <kbd>Escape</kbd> will close all parent popovers.                                                                              |
| placement  | `"bottom"` | `Placement?` | The [placement option](https://floating-ui.com/docs/tutorial#positioning) for [Floating UI](https://floating-ui.com/docs/tutorial).                         |

<hr/>

### Exposed properties with `ref`

All the components - `Popover`, `Trigger` and `Target` use `defineExpose`, this means when you use a ref on them - the ref won't point to their elements but rather to the properties defined in the `PopoverExpose` type.

::: code-group

```ts [PopoverExpose]
type PopoverExpose = {
  isOpen: DeepReadonly<Ref<boolean>>;
  targetId: DeepReadonly<Ref<string | undefined>>;

  hideAll(): void;
  hideChildren(): void;
  hideSiblings(): void;

  toggle(): void;
  show(): void;
  hide(): void;

  getTarget(): HTMLElement | undefined;
  getTrigger(): HTMLElement | undefined;
};
```

```vue [Usage]
<template>
  <PeachyPopover.Popover ref="popover" />
</template>

<script lang="ts" setup>
  import { PeachyPopover, type PopoverExpose } from "typeach";

  const popover = ref<PopoverExpose>();
</script>
```

:::
