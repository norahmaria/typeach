<template>
  <button
    ref="trigger"
    :class="triggerClass()"
    :data-open="unref(dialog?.isOpen)"
    :aria-controls="unref(dialog?.targetId)"
    aria-haspopup="dialog"
    type="button"
    @click="dialog?.open">
    <slot />
  </button>
</template>

<script lang="ts" generic="T" setup>
  import { inject, onMounted, ref, unref } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { DialogContextKey } from "./context";

  const { triggerClass } = usePeachyClasses("dialog", ["trigger"]);

  const trigger = ref<HTMLButtonElement>();

  const dialog = inject(DialogContextKey);

  onMounted(() => {
    dialog?.setTrigger(trigger.value);
  });
</script>
