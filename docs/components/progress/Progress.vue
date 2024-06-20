<!-- #region snippet -->
<template>
  <PeachyProgress.Progress :value="progress">
    <PeachyProgress.Label>Progress</PeachyProgress.Label>
  </PeachyProgress.Progress>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { computed, onMounted, ref } from "vue";

  import { PeachyProgress } from "../../../src";

  const progress = ref(0);

  const percentage = computed(() => `${progress.value}%`);

  onMounted(() => {
    setInterval(() => {
      if (progress.value === 100) {
        progress.value = 0;
      } else {
        progress.value++;
      }
    }, 200);
  });
</script>

<style lang="css">
  .peachy-progress::after {
    max-width: v-bind(percentage);
  }
</style>
