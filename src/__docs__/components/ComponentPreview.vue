<template>
  <div v-if="$slots.default" class="component-preview__example">
    <slot />
  </div>

  <Tabs v-if="tabs.length" :items="tabs">
    <template v-for="tab in tabs" :key="tab.id" #[tab.id]>
      <highlightjs :code="tab.code?.trim()" />
    </template>
  </Tabs>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from "vue";

  import Tabs from "./Tabs.vue";

  export interface ComponentPreviewProps {
    name: string;
    sfc?: string;
    css?: string;
  }

  const props = defineProps<ComponentPreviewProps>();

  const propsRef = toRefs(props);

  const tabs = computed(() => {
    const t = [];

    if (propsRef.sfc) {
      t.push({
        id: "sfc",
        title: `${propsRef.name.value}.vue`,
        code: propsRef.sfc.value,
      });
    }

    if (propsRef.css) {
      t.push({
        id: "css",
        title: `${propsRef.name.value}.css`,
        code: propsRef.css.value,
      });
    }

    return t;
  });
</script>

<style scoped>
  .component-preview__example {
    display: grid;
    place-content: center;
    position: relative;

    padding: 3rem;
    border: 2px solid var(--text-color);
    border-radius: var(--border-radius);
  }
</style>
