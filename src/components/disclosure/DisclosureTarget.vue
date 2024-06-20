<template>
  <div
    v-if="unref(disclosure?.isOpen)"
    :id="id"
    :class="contentClass()"
    :aria-labelledby="unref(disclosure?.triggerId)"
    :data-open="unref(disclosure?.isOpen)"
    role="region">
    <slot v-if="unref(disclosure?.isOpen)" />
  </div>
</template>

<script lang="ts" setup>
  import { inject, toRef, unref } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "../../hooks";

  import { DisclosureContextKey } from "./context";

  export interface DisclosureTargetProps {
    id?: string;
  }

  const props = withDefaults(defineProps<DisclosureTargetProps>(), {
    id: () => createRandomId(),
  });

  const { contentClass } = usePeachyClasses("disclosure", ["content"]);

  const idRef = toRef(props, "id");

  const disclosure = inject(DisclosureContextKey);

  watchImmediate(idRef, newId => {
    disclosure?.setTargetId(newId);
  });
</script>
