<template>
  <PeachySelect.Input v-model:selected-ids="selectedIds">
    <PeachyInput.Label id="select-label">Make a selection</PeachyInput.Label>

    <PeachySelect.Trigger id="select-trigger">
      {{ selectedIds.join(", ") }}
    </PeachySelect.Trigger>

    <PeachySelect.Target id="select-target">
      <PeachySelect.List id="select-list">
        <PeachySelect.Item id="none">None</PeachySelect.Item>

        <PeachySelect.Label>Category 1</PeachySelect.Label>

        <PeachySelect.Item id="select-one">Item 1</PeachySelect.Item>
        <PeachySelect.Item id="select-two">Item 2</PeachySelect.Item>

        <PeachySelect.Separator />
        <PeachySelect.Label>Category 2</PeachySelect.Label>

        <PeachySelect.Item id="select-three">Item 3</PeachySelect.Item>
        <PeachySelect.Item id="select-four">Item 4</PeachySelect.Item>
      </PeachySelect.List>
    </PeachySelect.Target>
  </PeachySelect.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput } from "../../";
  import { PeachySelect } from "../";

  const selectedIds = ref<string[]>(["select-one"]);
</script>
