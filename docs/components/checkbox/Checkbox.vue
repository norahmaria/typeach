<!-- #region snippet -->
<template>
  <PeachyInput.Input class="checkbox">
    <PeachyCheckbox.Input v-model:state="checked">
      <template #after>
        <PeachyCheckbox.Indicator>
          <CheckboxSvg />
        </PeachyCheckbox.Indicator>

        <PeachyInput.Label>Checkbox</PeachyInput.Label>
      </template>
    </PeachyCheckbox.Input>
  </PeachyInput.Input>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyCheckbox, PeachyInput } from "../../../src";

  import CheckboxSvg from "./CheckboxSvg.vue";

  const checked = ref(false);
</script>
