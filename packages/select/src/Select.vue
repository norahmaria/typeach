<template>
  <button class="lv-button">
    <h2>{{ title }}</h2>
    <slot />
    {{ snowflake }}
  </button>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },

    snowflake: {
      type: String,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .lv-button {
    background-color: red;
    font-size: 40px;

    h2 {
      color: #ff0;
    }
  }
</style>
