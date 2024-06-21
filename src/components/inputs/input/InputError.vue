<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <p :id="id" :class="errorClass()" aria-live="assertive">
    <slot v-if="show" />
  </p>
</template>

<script lang="ts" generic="T" setup>
  import { inject, ref, onBeforeUnmount, onMounted } from "vue";

  import { usePeachyClasses, createRandomId, InputContextKey } from "@/hooks";

  export interface InputLabelProps {
    id?: string;
  }

  const props = withDefaults(defineProps<InputLabelProps>(), {
    id: () => createRandomId(),
  });

  const { errorClass } = usePeachyClasses("input", ["error"]);

  const input = inject(InputContextKey);

  const show = ref(false);

  onMounted(() => {
    setTimeout(() => {
      show.value = true;
    }, 0);
  });

  onMounted(() => {
    input?.addError(props.id);
  });

  onBeforeUnmount(() => {
    input?.removeError(props.id);
  });
</script>
