<template>
  <button @click="open = !open">Toggle</button>

  <PeachyToast.Toast :open="open" :close-after="15000">
    Added milk to your shopping list

    <PeachyToast.Action descriptive-text="Go to 'Groceries' to remove item">
      Remove item
    </PeachyToast.Action>

    <PeachyToast.Close>Close notification</PeachyToast.Close>
  </PeachyToast.Toast>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import { PeachyToast } from "../";

  const open = ref(false);
</script>

<style>
  [role="status"] {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
</style>
