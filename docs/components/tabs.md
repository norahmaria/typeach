# Tabs

<br/>

<script lang="ts" setup>
  import Tabs from './tabs/Tabs.vue'
  import Carousel from './tabs/Carousel.vue'
  import './tabs/tabs.css'
  import './tabs/carousel.css'
</script>

<ClientOnly>
  <ComponentPreview>
      <Tabs />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./tabs/Tabs.vue#snippet
<<< ./tabs/tabs.css
:::

## Anatomy

```vue
<template>
  <PeachyTabs.Tabs>
    <PeachyTabs.Title />

    <PeachyTabs.IntervalController>
      <template #pause />
      <template #resume />
    </PeachyTabs.IntervalController>

    <PeachyTabs.NavigationButton />

    <PeachyTabs.List>
      <PeachyTabs.ListItem id="<tab-id>" />
    </PeachyTabs.List>

    <PeachyTabs.Panel id="<tab-id>" />
  </PeachyTabs.Tabs>
</template>

<script lang="ts" setup>
  import { PeachyTabs } from "typeach";
</script>
```

::: warning CAROUSEL DESCRIPTION
When [creating a carousel](#creating-a-carousel), a **localized value** for `aria-roledescription` should be provided for the panels.
:::

## Props & Emits

### `Tabs`

<br />

#### Props

| Name        | Default |    Type    |
| ----------- | :-----: | :--------: |
| tab         |         |  `string`  |
| followFocus | `false` | `boolean?` |
| interval    |   `0`   | `number?`  |

::: info `followFocus` USES `v-show` INSTEAD OF `v-if`
When `followFocus` is set the panels will be rendered but stay hidden with `v-show`, rather than delay render with `v-if` - to preload the content to ensure a smooth experience for all users quickly shifting through.
:::

#### Emits

| @          | Payload  |
| ---------- | :------: |
| update:tab | `string` |

<hr/>

### `List`

<br />

#### Props

| Name        |    Default    |   Type    |
| ----------- | :-----------: | :-------: |
| orientation | `Orientation` | `string?` |

```ts
type Orientation = "horizontal" | "vertical";
```

<hr/>

### `ListItem`

<br />

#### Props

| Name | Default |   Type   |
| ---- | :-----: | :------: |
| id   |         | `string` |

::: warning `id` SHOULD MATCH `id` OF IT'S `Panel`
To create a relation between a `ListItem` and `Panel`, `id`'s are used. If you provide different values, the tabs will not work as expected, **and the accessibility will be compromised**.
:::

::: info `id` WILL BE MODIFIED
A suffix will be added to the `id`. If you pass in `"tabs"`, the `id` rendered will be `"tabs-list-item"`. This is purely to make our lives easier when declaring the ARIA relation between a `ListItem` and `Panel`.
:::

<hr/>

### `Panel`

<br />

#### Props

| Name | Default |   Type   |
| ---- | :-----: | :------: |
| id   |         | `string` |

::: warning `id` SHOULD MATCH `id` OF IT'S `ListItem`
To create a relation between a `ListItem` and `Panel`, `id`'s are used. If you provide different values, the tabs will not work as expected, **and the accessibility will be compromised**.
:::

<hr/>

### `NavigationButton`

<br />

#### Props

| Name | Default |          Type          |
| ---- | :-----: | :--------------------: |
| to   |         | `"next"`, `"previous"` |

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                      | Description                               |  For                                   |
| ----------------------------- | ----------------------------------------- | -------------------------------------- |
| `[data-paused="<boolean>"]`   | Selection based on if it's paused or not. | <ul><li>`IntervalController`</li></ul> |
| `[aria-selected="<boolean>"]` | For the selected state of a tab.          | <ul><li>`ListItem`</li></ul>           |
| `[data-to="<Direction>"]`     | For the direction of a navigation button. | <ul><li>`NavigationButton`</li></ul>   |

```ts
type Direction = "next" | "previous";
```

## Accessibility

Resources: [APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [APG Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/?moreaccessible=false) with tabs

::: warning CAROUSEL DESCRIPTION
When [creating a carousel](#creating-a-carousel), a **localized value** for `aria-roledescription` should be provided for the panels.
:::

### Keyboard interactions

| Key                                            | Action                                |
| ---------------------------------------------- | ------------------------------------- |
| <kbd>Space</kbd> or <kbd>↵</kbd> on `ListItem` | Opens the associated tab.             |
| <kbd>→</kbd> on a `ListItem`                   | Moves focus to the next tab item.     |
| <kbd>←</kbd> on a `ListItem`                   | Moves focus to the previous tab item. |
| <kbd>Home</kbd> on a `ListItem`                | Moves focus to the first tab item.    |
| <kbd>End</kbd> on a `ListItem`                 | Moves focus to the last tab item.     |

**Hover and keyboard interactions are synced.** _E.g. in the [example tab](#tabs), if you hover over "Tab 1", and then press arrow right - the focus will move to "Tab 2"_.

### Automatic rotating with `interval`

When `Tabs` has an interval, it will automatically rotate through the tabs - except for when a user is hovering or has focus inside `Tabs`.

::: warning ALLOW USERS TO STOP AUTOMATIC ROTATION
If you set an interval, you need to provide a way for the user to stop the automatic rotation. This can be done by providing an `IntervalController`.
:::

## Creating a carousel

<ClientOnly>
  <ComponentPreview>
      <Carousel />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./tabs/Carousel.vue#snippet{4-5,24-28,35,43,51,56-60,63-73}
<<< ./tabs/carousel.css [carousel.css (extends tabs.css)]
:::
