<template>
  <HierarchyTitle :id="id" :class="titleClass()" as-parent>
    <template #title>
      <slot />
    </template>
  </HierarchyTitle>
</template>

<script lang="ts" setup>
  import { inject, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "@/hooks";

  import { DialogContextKey } from "./context";

  import HierarchyTitle from "../hierarchy-title/HierarchyTitle.vue";

  export interface DialogTitleProps {
    id?: string;
  }

  const props = withDefaults(defineProps<DialogTitleProps>(), {
    id: () => createRandomId(),
  });

  const { titleClass } = usePeachyClasses("dialog", ["title"]);

  const idRef = toRef(props, "id");

  const dialog = inject(DialogContextKey);

  watchImmediate(idRef, newId => {
    dialog?.setTitleId(newId);
  });
</script>
