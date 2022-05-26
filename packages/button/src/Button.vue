<template>
  <button class="typeach-button">
    <!-- @slot Content -->
    <slot>Hello World</slot>
  </button>
</template>

<script lang="ts" setup>
  defineProps({
    /** Color of the button */
    color: {
      type: String,
      default: 'primary',
      validator: (color: string) =>
        ['primary', 'success', 'error', 'warning', 'neutral'].includes(color),
    },
  })
</script>

<style lang="scss" scoped>
  .typeach-button {
    background-color: red;
    font-size: 30px;
    border: none;
    border-radius: 20px;
  }
</style>
