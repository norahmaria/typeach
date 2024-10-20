<template>
  <PeachyInput.Input class="text-input">
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

<script lang="ts" setup>
  import { ref } from "vue";
  import { PeachyInput, PeachyTextInput } from "typeach";

  const input = ref<string>("");
</script>

<style src="./text-input.css" />
