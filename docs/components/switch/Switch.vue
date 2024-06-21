<template>
  <PeachyInput.Input>
    <PeachySwitch.Input v-model:on="on">
      <PeachySwitch.Indicator>
        <div class="dot" />
      </PeachySwitch.Indicator>

      Switch
    </PeachySwitch.Input>
  </PeachyInput.Input>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyInput, PeachySwitch } from "@/index";

  const on = ref(false);
</script>
