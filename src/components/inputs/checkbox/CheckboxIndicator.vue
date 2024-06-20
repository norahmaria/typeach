<template>
  <div
    :class="indicatorClass()"
    :data-state="unref(checkbox?.state)"
    aria-hidden="true"
    @click="checkbox?.onClick">
    <slot
      v-if="unref(checkbox?.state) === 'indeterminate'"
      name="indeterminate" />

    <slot v-else-if="unref(checkbox?.state)" />
  </div>
</template>

<script lang="ts" setup>
  import { inject, unref } from "vue";

  import { usePeachyClasses } from "../../../hooks";

  import { CheckboxContextKey, type CheckboxContext } from "./context";

  const { indicatorClass } = usePeachyClasses("checkbox", ["indicator"]);

  const checkbox = inject<CheckboxContext>(CheckboxContextKey);
</script>
