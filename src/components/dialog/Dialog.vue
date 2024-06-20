<template>
  <slot />
</template>

<script lang="ts" setup>
  import { readonly, ref, provide } from "vue";

  import { DialogContextKey } from "./context";

  const isOpen = ref(false);

  const isAboutToOpen = ref(false);

  const targetId = ref<string>();

  const titleId = ref<string>();

  const descriptionId = ref<string>();

  const trigger = ref<HTMLButtonElement>();

  provide(DialogContextKey, {
    isOpen: readonly(isOpen),

    isAboutToOpen: readonly(isAboutToOpen),

    targetId: readonly(targetId),

    titleId: readonly(titleId),

    descriptionId: readonly(descriptionId),

    trigger,

    setTargetId(id) {
      targetId.value = id;
    },

    setTitleId(id) {
      titleId.value = id;
    },

    setDescriptionId(id) {
      descriptionId.value = id;
    },

    setTrigger(triggerElement) {
      trigger.value = triggerElement;
    },

    open() {
      isAboutToOpen.value = true;
      setTimeout(() => (isOpen.value = true), 0);
    },

    close() {
      isAboutToOpen.value = false;
      isOpen.value = false;
    },
  });
</script>
