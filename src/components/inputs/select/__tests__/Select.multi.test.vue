<template>
  <PeachySelect.Input
    v-model:selected-ids="selectedIds"
    :readonly="readonly"
    multi-select>
    <PeachyInput.Label id="select-label">Make a selection</PeachyInput.Label>

    <PeachySelect.Trigger id="select-trigger">
      {{ selectedIds.join(", ") || "No selection" }}
    </PeachySelect.Trigger>

    <PeachySelect.Target id="select-target">
      <PeachySelect.List id="select-list">
        <PeachySelect.Item id="none">None</PeachySelect.Item>

        <PeachySelect.Label>Category 1</PeachySelect.Label>

        <PeachySelect.Item id="select-one" selected>Item 1</PeachySelect.Item>
        <PeachySelect.Item id="select-two" selected>Item 2</PeachySelect.Item>

        <PeachySelect.Separator />
        <PeachySelect.Label>Category 2</PeachySelect.Label>

        <PeachySelect.Item id="select-three" selected>Item 3</PeachySelect.Item>
        <PeachySelect.Item id="select-four" selected>Item 4</PeachySelect.Item>
      </PeachySelect.List>
    </PeachySelect.Target>
  </PeachySelect.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput } from "../../input";
  import { PeachySelect } from "../";

  export interface SelectMultiTestProps {
    readonly?: boolean;
  }

  defineProps<SelectMultiTestProps>();

  const selectedIds = ref<string[]>(["select-one"]);
</script>

<style>
  :focus {
    background-color: red !important;
  }
</style>
