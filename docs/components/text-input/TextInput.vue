<!-- #region snippet -->
<template>
  <PeachyInput.Input class="text">
    <PeachyTextInput.Input
      v-bind="$attrs"
      v-model:value="input"
      placeholder="Placeholder">
      <template #before>
        <PeachyInput.Label>Text input</PeachyInput.Label>
      </template>
    </PeachyTextInput.Input>
  </PeachyInput.Input>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";
  import { PeachyInput, PeachyTextInput } from "../../../src";

  const input = ref<string>("");
</script>
