<template>
  <PeachyInput.Input class="text-input">
    <PeachyTextInput.Input
      v-model:value="input"
      placeholder="Placeholder"
      @validate="validateTextInput"
      @clear-validation="textErrors = []">
      <template #before>
        <PeachyInput.Label>
          Text input

          <unicon
            v-if="textErrors.length"
            name="exclamation-triangle"
            aria-hidden="true" />
        </PeachyInput.Label>

        <PeachyInput.Description>Max 5 characters.</PeachyInput.Description>
      </template>

      <template #after>
        <PeachyInput.Error v-for="(errorMessage, i) in textErrors" :key="i">
          {{ errorMessage }}
        </PeachyInput.Error>
      </template>
    </PeachyTextInput.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput, PeachyTextInput } from "typeach";

  import "../../text-input/__docs__/text-input.css";

  const textErrors = ref<string[]>([]);

  const input = ref("");

  const validateTextInput = (value: string) => {
    if (value.length > 5) {
      textErrors.value.push("Text must be 5 characters or less.");
    } else {
      textErrors.value = [];
    }
  };
</script>

<style src="./input.css" />
