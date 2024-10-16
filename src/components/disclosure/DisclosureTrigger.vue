<template>
  <component
    :is="is"
    :id="id"
    :class="triggerClass()"
    :aria-expanded="unref(disclosure?.isOpen)"
    :aria-controls="unref(disclosure?.targetId)"
    tabindex="0"
    type="button"
    @click="disclosure?.toggle"
    @touch="disclosure?.toggle"
    @keydown.enter.prevent="disclosure?.toggle"
    @keydown.space.prevent="disclosure?.toggle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { inject, toRef, unref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "@/hooks";

  import { DisclosureContextKey } from "./context";

  export interface DisclosureTriggerProps {
    id?: string;

    /**
     * The `is` attribute for the [dynamic root component](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).
     */
    is?: string;
  }

  const props = withDefaults(defineProps<DisclosureTriggerProps>(), {
    id: () => createRandomId(),
    is: "button",
  });

  const { triggerClass } = usePeachyClasses("disclosure", ["trigger"]);

  const idRef = toRef(props, "id");

  const disclosure = inject(DisclosureContextKey);

  watchImmediate(idRef, newId => {
    disclosure?.setTriggerId(newId);
  });
</script>
