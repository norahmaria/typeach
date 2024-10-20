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

  type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  export interface HierarchyTitleProps {
    /**
     * Allows you to manually override the current level.
     */
    is?: HeadingTag;

    /**
     * Allow the title to take the level of the parent title.
     */
    asParent?: boolean;

    /**
     * Adds a data attribute for styling purposes.
     */
    as?: HeadingTag;
  }

  const props = defineProps<HierarchyTitleProps>();

  defineSlots<{
    /**
     * The content belonging under this title.
     */
    default(): any;

    /**
     * The actual title.
     */
    title(): any;
  }>();

  const { hierarchyTitleClass } = usePeachyClasses("hierarchyTitle");

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
