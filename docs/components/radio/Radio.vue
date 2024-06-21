<!-- #region snippet -->
<template>
  <PeachyInput.Input>
    <PeachyRadio.Input v-model:selected="selected">
      <PeachyRadio.InputLabel>Radio group</PeachyRadio.InputLabel>

      <div class="radio-wrapper">
        <PeachyRadio.Radio value="1">
          <template #after>
            <PeachyRadio.Indicator />
            <PeachyRadio.Label>Radio 1</PeachyRadio.Label>
          </template>
        </PeachyRadio.Radio>
      </div>

      <div class="radio-wrapper">
        <PeachyRadio.Radio value="2">
          <template #after>
            <PeachyRadio.Indicator />
            <PeachyRadio.Label>Radio 2</PeachyRadio.Label>
          </template>
        </PeachyRadio.Radio>
      </div>
    </PeachyRadio.Input>
  </PeachyInput.Input>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput, PeachyRadio } from "@/index";

  const selected = ref("1");
</script>
