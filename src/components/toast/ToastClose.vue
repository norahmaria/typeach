<template>
  <button :class="closeClass()" type="button" @click="toastContext?.close">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { inject } from "vue";

  import { usePeachyClasses } from "../../hooks";

  import { ToastContextKey } from "./context";

  const { closeClass } = usePeachyClasses("toast", ["close"]);

  const toastContext = inject(ToastContextKey);
</script>
