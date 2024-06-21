<template>
  <component
    v-if="$slots.title"
    :is="isAttr"
    v-bind="$attrs"
    :class="hierarchyTitleClass()"
    :data-as="as">
    <slot name="title" />
  </component>

  <slot />
</template>

<script lang="ts" setup>
  import { computed, inject, provide } from "vue";

  import { usePeachyClasses } from "@/hooks";

  export interface HierarchyTitleProps {
    /**
     * Let's you manually override the level
     * for a title, should really only be used for
     * your's site's main heading (H1), or resetting
     * the levels for an entire section.
     *
     * For example, we use this in the
     * `@Modal` component to ensure
     * the headings start at H2.
     *
     * ```html
     * <HierarchyTitle is="h2">
     *  <template #title>
     *    Will be H2.
     *  </template>
     *
     *  <HierarchyTitle>
     *    <template #title>
     *      Will be H3.
     *    </template>
     *  </HierarchyTitle>
     * </HierarchyTitle>
     * ```
     */
    is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

    /**
     * Allows a title to take the level
     * of it's parent title.
     *
     * Useful when you want to place your
     * title within another element
     * or in it's own component, where
     * using the `<template #title />` syntax
     * would be invalid.
     *
     * ```html
     * <HierarchyTitle is="h2">
     *  <SectionHeader>
     *    <HierarchyTitle as-parent>
     *      <template #title>
     *        Will be H2.
     *      </template>
     *    </HierarchyTitle>
     *  </SectionHeader>
     * </HierarchyTitle>
     * ```
     *
     * Important to note, when a child
     * `HierarchyTitle` has `as-parent` set to true,
     * you should *not* have a `<template #title />`
     * for the parent title.
     */
    asParent?: boolean;

    /**
     * Adds a data attribute for styling purposes.
     */
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }

  const { hierarchyTitleClass } = usePeachyClasses("hierarchyTitle");

  const props = defineProps<HierarchyTitleProps>();

  const level = inject<number>("peachy-typography", 2);

  const toH = (level: number) =>
    `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const getCurrentLevel = () => {
    if (props.is) {
      return parseInt(props.is.replace("h", ""), 10) + 1;
    }

    if (props.asParent) {
      return level;
    }

    return level + 1;
  };

  const isAttr = computed(() => {
    if (props.is) {
      return props.is;
    }

    if (level > 6) {
      return "p";
    }

    if (props.asParent) {
      return toH(level - 1);
    }

    return toH(level);
  });

  provide("peachy-typography", getCurrentLevel());
</script>
