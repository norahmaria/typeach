<template>
  <button class="typeach-select">
    <h2>{{ title }}</h2>
    <p>{{ snowflake }}</p>
  </button>
</template>

<script setup lang="ts">
  defineProps({
    /** Select Title */
    title: {
      type: String,
      default: '',
    },

    /** Select Id */
    snowflake: {
      type: String,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .typeach-select {
    background-color: red;
    font-size: 40px;

    h2 {
      color: #ff0;
    }
  }
</style>
