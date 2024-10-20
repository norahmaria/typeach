<template>
  <h4>Events</h4>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Arguments</th>
        <th v-if="includeDescriptions">Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="event in meta" :key="event.name">
        <td>@{{ event.name }}</td>
        <td>
          <code v-if="event.type !== '[]'">{{ event.type }}</code>
        </td>
        <td v-if="includeDescriptions" v-html="event.description" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from "vue";
  import type { ComponentMeta } from "vue-component-meta";

  export interface ComponentEventsProps {
    meta: ComponentMeta["events"];
  }

  const props = defineProps<ComponentEventsProps>();

  const propsRef = toRefs(props);

  const includeDescriptions = computed(() => {
    return propsRef.meta.value.some(e => {
      return !!e.description;
    });
  });
</script>
