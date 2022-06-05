<template>
  <div :class="$class()">
    <h2 :class="$class('title')">{{ title }}</h2>
    <ul :class="$class('options')">
      <typeach-option title="Option" />
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { $class } from '../../utils'
  import TypeachOption from './Option/TypeachOption.vue'

  defineProps({
    /** Select Title */
    title: {
      type: String,
      default: '',
    },

    /** Select Id */
    id: {
      type: String,
      required: true,
    },
  })
</script>

<style scoped lang="scss">
  .typeach-select {
    font-family: sans-serif;

    text-align: center;
    font-size: 2rem;

    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1;

    height: min-content;

    &__title {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      line-height: 1;

      font-weight: bolder;
    }

    &__options {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      line-height: 1;

      list-style: none;
    }
  }
</style>
