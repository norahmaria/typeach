<template>
  <button :class="$class()">
    <!-- @slot Left Icon  -->
    <slot name="left-icon" />
    <!-- @slot Content  -->
    <slot />
    <!-- @slot Right Icon  -->
    <slot name="right-icon" />
  </button>
</template>

<script lang="ts" setup>
  import { $class } from '../../utils'

  defineProps({
    /** Color of the button */
    color: {
      type: String,
      default: 'primary',
      validator: (value: string) =>
        ['primary', 'success', 'danger', 'warning', 'info', 'neutral'].includes(
          value
        ),
    },
  })
</script>

<style lang="scss" scoped>
  .typeach-button {
    line-height: 1;
    margin: 0;
    font: inherit;

    // color: $white;
    font-weight: 525;
    letter-spacing: 0.15px;

    padding: 0.6em 0.75em;
    // border-radius: $br;
    border: none;

    cursor: pointer;
    // transition: background 0.2s $cubic, border 0.2s $cubic;

    display: flex;
    align-items: center;
    justify-content: center;

    &--fake {
      background: blue;
      border: none;
    }

    &--error {
      background: red;
      border: none;
    }
  }
</style>
