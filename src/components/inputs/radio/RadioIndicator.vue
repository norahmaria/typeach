<template>
  <div
    :class="indicatorClass()"
    :data-checked="unref(radio?.selected)"
    aria-hidden="true"
    @click="radio?.onClick">
    <slot v-if="unref(radio?.selected)" />
  </div>
</template>

<script lang="ts" generic="T" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { RadioContextKey } from "./context";

  const { indicatorClass } = usePeachyClasses("radio", ["indicator"]);

  defineSlots<{
    /**
     * Only renders when the radio is selected.
     */
    default(): any;
  }>();

  const radio = inject(RadioContextKey);
</script>
