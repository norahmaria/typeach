<template>
  <h4>Props</h4>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th v-if="includeDescriptions">Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="prop in meta" :key="prop.name">
        <td>
          {{ prop.name }}
        </td>
        <td>
          <code>{{ prop.type.replace(" | undefined", "?") }}</code>
        </td>
        <td>
          <code v-if="prop.default && prop.default !== 'undefined'">
            {{ prop.default }}
          </code>
        </td>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <td v-if="includeDescriptions" class="long" v-html="prop.description" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from "vue";

  import type { ComponentMeta } from "vue-component-meta";

  export interface ComponentPropsProps {
    meta: ComponentMeta["props"];
  }

  const props = defineProps<ComponentPropsProps>();

  const propsRef = toRefs(props);

  const includeDescriptions = computed(() => {
    return propsRef.meta.value.some(p => {
      return !!p.description;
    });
  });
</script>

<style scoped>
  .props {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .card {
    border: 1px solid var(--divider-color);
    border-radius: var(--border-radius);
    padding: 1em;
  }

  .title h5 {
    font-size: 1.15rem;
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .title code {
    width: max-content;
  }

  div.description {
    margin-block: 0.5em;
  }
</style>
