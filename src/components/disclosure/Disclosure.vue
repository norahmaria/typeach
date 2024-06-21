<template>
  <div :class="disclosureClass()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide, watch, toRef, readonly } from "vue";

  import { usePeachyClasses } from "@/hooks";

  import { DisclosureContextKey } from "./context";

  export interface DisclosureProps {
    open?: boolean;
  }

  const props = withDefaults(defineProps<DisclosureProps>(), {
    open: false,
  });

  const emit = defineEmits<{
    "update:open": [isOpen: boolean];
  }>();

  const { disclosureClass } = usePeachyClasses("disclosure");

  const isOpen = ref(props.open);

  const triggerId = ref<string>();

  const targetId = ref<string>();

  watch(toRef(props, "open"), newIsOpen => {
    isOpen.value = newIsOpen;
  });

  provide(DisclosureContextKey, {
    isOpen: isOpen,

    triggerId: readonly(triggerId),
    targetId: readonly(targetId),

    setTriggerId(id) {
      triggerId.value = id;
    },

    setTargetId(id) {
      targetId.value = id;
    },

    toggle() {
      isOpen.value = !isOpen.value;
      emit("update:open", isOpen.value);
    },
  });
</script>
