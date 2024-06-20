<!-- #region snippet -->
<template>
  <button @click="open = true">
    Open toast
  </button>

  <Transition name="toast">
    <PeachyToast.Toast 
      v-model:open="open" 
      :close-after="10000">
      This toast will disappear.
    
      <PeachyToast.Action descriptive-text="Go to 'Actions' to do this action">
        Action
      </PeachyToast.Action>
    
      <PeachyToast.Close aria-label="Close">
        <CrossSvg />
      </PeachyToast.Close>
    </PeachyToast.Toast>
  </Transition>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyToast } from "../../../src";

  import CrossSvg from "./CrossSvg.vue";

  const open = ref(false);
</script>

