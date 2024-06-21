<template>
  <div :id="id" :class="labelClass()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { inject, toRef } from "vue";
  import { watchImmediate } from "@vueuse/core";

  import { usePeachyClasses, createRandomId } from "@/hooks";

  import { ProgressContextKey } from "./context";

  export interface ProgressLabelProps {
    id?: string;
  }

  const props = withDefaults(defineProps<ProgressLabelProps>(), {
    id: () => createRandomId(),
  });

  const { labelClass } = usePeachyClasses("progress", ["label"]);

  const idRef = toRef(props, "id");

  const progress = inject(ProgressContextKey);

  watchImmediate(idRef, newId => {
    progress?.setLabelId(newId);
  });
</script>
```
