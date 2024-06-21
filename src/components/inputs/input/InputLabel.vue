<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label :for="unref(input?.id)" :class="labelClass()">
    <slot />
  </label>
</template>

<script lang="ts" generic="T" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses, InputContextKey } from "@/hooks";

  const { labelClass } = usePeachyClasses("input", ["label"]);

  const input = inject(InputContextKey);
</script>
