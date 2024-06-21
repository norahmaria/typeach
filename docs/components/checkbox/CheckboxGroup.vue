<!-- #region snippet -->
<template>
  <PeachyInput.Group>
    <PeachyInput.GroupLabel>Grouped checkboxes</PeachyInput.GroupLabel>

    <PeachyInput.Input class="checkbox">
      <PeachyCheckbox.Input v-model:state="checkboxOne">
        <template #after>
          <PeachyCheckbox.Indicator>
            <CheckboxSvg />
          </PeachyCheckbox.Indicator>

          <PeachyInput.Label>Checkbox 1</PeachyInput.Label>
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>

    <PeachyInput.Input class="checkbox">
      <PeachyCheckbox.Input v-model:state="checkboxTwo">
        <template #after>
          <PeachyCheckbox.Indicator>
            <CheckboxSvg />
          </PeachyCheckbox.Indicator>

          <PeachyInput.Label>Checkbox 2</PeachyInput.Label>
        </template>
      </PeachyCheckbox.Input>
    </PeachyInput.Input>
  </PeachyInput.Group>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyCheckbox, PeachyInput } from "@/index";

  import CheckboxSvg from "./CheckboxSvg.vue";

  const checkboxOne = ref(false);

  const checkboxTwo = ref(false);
</script>
