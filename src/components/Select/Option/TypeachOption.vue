<template>
  <li :class="$class({ selected })">
    <h3 :class="$class('title')">{{ title }}</h3>
  </li>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { $class } from '../../../utils'

  const selected = ref(true)

  defineProps({
    /** Option Title */
    title: {
      type: String,
      required: true,
    },
  })
</script>

<style scoped lang="scss">
  .typeach-option {
    border-radius: 1rem;
    font-size: 40px;

    margin: 0;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    line-height: 1;

    text-transform: uppercase;

    &--selected {
      background-color: skyblue;
    }

    &__title {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      line-height: 1;

      font-weight: normal;
      font-size: 1.5rem;
    }
  }
</style>
