<template>
  <button class="button">
    <slot />
    helloworld
  </button>
</template>

<script lang="ts" setup>
  defineProps({})
</script>

<style scoped>
  .button {
    background-color: red;
    font-size: 30px;
    border: none;
    border-radius: 20px;
  }
</style>
