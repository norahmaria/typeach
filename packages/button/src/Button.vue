<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  defineProps({
    color: {
      type: String,
      default: 'primary',
    },
  })
</script>

<style lang="scss" scoped>
  .button {
    background-color: red;
    font-size: 30px;
    border: none;
    border-radius: 20px;
  }
</style>
