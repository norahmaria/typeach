<template>
  <button class="toast-trigger" @click="open = true">Open toast</button>

  <PeachyToast.Toast v-model:open="open" :close-after="10000">
    <p>This toast will disappear.</p>

    <PeachyToast.Action descriptive-text="Go to 'Actions' to do this action">
      Action
    </PeachyToast.Action>

    <PeachyToast.Close aria-label="Close">
      <unicon name="times" />
    </PeachyToast.Close>
  </PeachyToast.Toast>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyToast } from "typeach";

  const open = ref(false);
</script>

<style src="./toast.css" />
