<template>
  <p :id="id" :class="descriptionClass()">
    <slot />
  </p>
</template>

<script lang="ts" generic="T" setup>
  import { inject, onBeforeUnmount, onMounted } from "vue";

  import {
    usePeachyClasses,
    createRandomId,
    InputContextKey,
  } from "../../../hooks";

  export interface InputLabelProps {
    id?: string;
  }

  const props = withDefaults(defineProps<InputLabelProps>(), {
    id: () => createRandomId(),
  });

  const { descriptionClass } = usePeachyClasses("input", ["description"]);

  const input = inject(InputContextKey);

  onMounted(() => {
    input?.addDescription(props.id);
  });

  onBeforeUnmount(() => {
    input?.removeDescription(props.id);
  });
</script>
