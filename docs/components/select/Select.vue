<!-- #region snippet -->
<template>
  <PeachyInput.Input class="select">
    <PeachySelect.Input v-model:selected-ids="selectedIds">
      <PeachyInput.Label>Select an option</PeachyInput.Label>

      <PeachyInput.Description>
        Clear with
        <kbd>Backspace</kbd>
        or
        <kbd>Delete</kbd>
        .
      </PeachyInput.Description>

      <PeachyInput.Error v-for="(e, i) in errs" :key="i">
        {{ e }}
      </PeachyInput.Error>

      <PeachySelect.Trigger>
        {{ mapIdsToLabel(selectedIds) }}

        <ChevronSvg aria-hidden="true" />
      </PeachySelect.Trigger>

      <PeachySelect.Target>
        <PeachySelect.List>
          <PeachySelect.Item id="none">
            None

            <PeachySelect.Indicator>
              <CheckboxSvg />
            </PeachySelect.Indicator>
          </PeachySelect.Item>

          <PeachySelect.Label>Label</PeachySelect.Label>

          <PeachySelect.Item id="one">
            Item 1

            <PeachySelect.Indicator>
              <CheckboxSvg />
            </PeachySelect.Indicator>
          </PeachySelect.Item>

          <PeachySelect.Item id="two" disabled>
            Item 2

            <PeachySelect.Indicator>
              <CheckboxSvg />
            </PeachySelect.Indicator>
          </PeachySelect.Item>

          <PeachySelect.Separator />
          <PeachySelect.Label>Label</PeachySelect.Label>

          <PeachySelect.Item id="three">
            Item 3

            <PeachySelect.Indicator>
              <CheckboxSvg />
            </PeachySelect.Indicator>
          </PeachySelect.Item>

          <PeachySelect.Item id="four">
            Item 4

            <PeachySelect.Indicator>
              <CheckboxSvg />
            </PeachySelect.Indicator>
          </PeachySelect.Item>
        </PeachySelect.List>
      </PeachySelect.Target>
    </PeachySelect.Input>
  </PeachyInput.Input>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref, watch } from "vue";

  import { PeachyInput, PeachySelect } from "@/index";

  import ChevronSvg from "./ChevronSvg.vue";
  import CheckboxSvg from "./CheckboxSvg.vue";

  const selectedIds = ref<string[]>([]);

  const errs = ref<string[]>([]);

  watch(selectedIds, newSelectedIds => {
    if (newSelectedIds.includes("none")) {
      selectedIds.value = [];
    }
  });

  const mapIdsToLabel = (ids?: string[]) => {
    if (!ids?.length) {
      return "None";
    }

    return ids.map(id => mapIdToLabel(id)).join(", ");
  };

  const mapIdToLabel = (id: string) => {
    if (id === "none") {
      return "None";
    }

    if (id === "one") {
      return "Item 1";
    } else if (id === "two") {
      return "Item 2";
    } else if (id === "three") {
      return "Item 3";
    } else if (id === "four") {
      return "Item 4";
    }

    return "Unknown item";
  };
</script>
