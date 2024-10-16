<template>
  <PeachyInput.Input class="checkbox">
    <PeachyCheckbox.Input v-model:state="checked">
      <template #after>
        <PeachyCheckbox.Indicator>
          <unicon name="check" />
        </PeachyCheckbox.Indicator>

        <PeachyInput.Label>Checkbox</PeachyInput.Label>
      </template>
    </PeachyCheckbox.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyCheckbox, PeachyInput } from "typeach";

  const checked = ref(false);
</script>

<style src="./checkbox.css" />
