<template>
  <p :id="id" :class="descriptionClass()">
    <slot />
  </p>
</template>

<script lang="ts" setup>
  import { inject, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "@/hooks";

  import { DialogContextKey } from "./context";

  export interface DialogDescriptionProps {
    id?: string;
  }

  const props = withDefaults(defineProps<DialogDescriptionProps>(), {
    id: () => createRandomId(),
  });

  const { descriptionClass } = usePeachyClasses("dialog", ["description"]);

  const idRef = toRef(props, "id");

  const dialog = inject(DialogContextKey);

  watchImmediate(idRef, newId => {
    dialog?.setDescriptionId(newId);
  });
</script>
