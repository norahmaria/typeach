<template>
  <h4>Slots</h4>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="slot in meta" :key="slot.name">
        <td>{{ slot.name }}</td>
        <td v-html="slot.description" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import type { ComponentMeta } from "vue-component-meta";

  export interface ComponentSlotsProps {
    meta: ComponentMeta["slots"];
  }

  defineProps<ComponentSlotsProps>();
</script>
