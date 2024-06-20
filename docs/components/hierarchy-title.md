# Hierarchy Title

<br />

<script lang="ts" setup>
  import HierarchyTitle from './hierarchy-title/HierarchyTitle.vue'
  import './hierarchy-title/hierarchy-title.css'
</script>

<ClientOnly>
  <ComponentPreview>
  <HierarchyTitle />
  </ComponentPreview>
</ClientOnly>

::: code-group
<<< ./hierarchy-title/HierarchyTitle.vue#snippet
<<< ./hierarchy-title/hierarchy-title.css
:::

## Anatomy

```vue
<template>
  <PeachyHierarchyTitle>
    <template #title />

    <!-- Content and subtitles -->
  </PeachyHierarchyTitle>
</template>

<script lang="ts" setup>
  import { PeachyHierarchyTitle } from "typeach";
</script>
```

The first layer starts at `h2`. _You can set the `is` prop where `h1` is needed._

## Props & Emits

#### Props

| Name     | Default |     Type      | Description                                            |
| -------- | :-----: | :-----------: | ------------------------------------------------------ |
| is       |         | `HeadingTag?` | Allows you to override the current level.              |
| asParent | `false` |  `boolean?`   | Allow the title to take the level of the parent title. |
| as       |         |  `boolean?`   | Adds a data attribute for styling purposes.            |

```ts
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
```

## Styling

### CSS Selectors

Follows [our CSS classes convention](/info#styling).

<br />

#### State selectors

| Selector                   | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `HeadingTag` `"p"`         | For the actual level of the heading, for `"p"` see [Accessibility](#accessibility).          |
| `[data-as="<HeadingTag>"]` | Based on the `as` attribute to allow styling separate from the logical level of the heading. |

```ts [HeadingLevel]
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
```

## Accessibility

- Titles nested past `h6` will become `p` tags.
