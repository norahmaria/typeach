<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label :for="unref(radio?.id)" :class="labelClass()">
    <slot />
  </label>
</template>

<script lang="ts" setup>
  import { inject, unref } from "vue";
  import { usePeachyClasses } from "../../../hooks";
  import { RadioContextKey } from "./context";

  const { labelClass } = usePeachyClasses("radio", ["label"]);

  const radio = inject(RadioContextKey);
</script>
