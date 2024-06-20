<template>
  <button
    :class="intervalControllerClass()"
    :data-paused="isPaused"
    type="button"
    @click="isPaused = !isPaused">
    <slot v-if="isPaused" name="resume" />

    <slot v-else name="pause" />
  </button>
</template>

<script lang="ts" setup>
  import { ref, inject, watch } from "vue";

  import { usePeachyClasses } from "../../hooks";

  import { TabsContextKey } from "./context";

  const { intervalControllerClass } = usePeachyClasses("tabs", [
    "intervalController",
  ]);

  const tabsContext = inject(TabsContextKey);

  const isPaused = ref(false);

  watch(isPaused, newIsPaused => {
    if (newIsPaused) {
      tabsContext?.pause();
    } else {
      tabsContext?.resume();
    }
  });
</script>
