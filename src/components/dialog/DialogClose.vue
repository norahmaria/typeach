<template>
  <button :class="closeClass()" @click="dialog?.close">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { inject } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { DialogContextKey } from "./context";

  const { closeClass } = usePeachyClasses("dialog", ["close"]);

  const dialog = inject(DialogContextKey);
</script>
