<template>
  <template v-if="meta && hasApi">
    <h3>
      {{ title }}
    </h3>

    <div v-if="$slots.default" style="padding-inline-start: 1em">
      <slot />
    </div>

    <div
      class="component-api"
      style="padding-inline-start: 1em; margin-block-end: 3em">
      <ComponentProps v-if="meta.props.length" :meta="meta.props" />
      <ComponentEvents v-if="meta.events.length" :meta="meta.events" />
      <ComponentSlots v-if="meta.slots.length > 1" :meta="meta.slots" />
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { toRef, computed } from "vue";
  import type { ComponentMeta } from "vue-component-meta";

  import ComponentProps from "./meta/ComponentProps.vue";
  import ComponentEvents from "./meta/ComponentEvents.vue";
  import ComponentSlots from "./meta/ComponentSlots.vue";

  export interface ComponentApiProps {
    title: string;
    meta?: ComponentMeta;
  }

  const props = defineProps<ComponentApiProps>();

  const metaRef = toRef(props, "meta");

  const hasApi = computed(() => {
    if (!metaRef.value) {
      return false;
    }

    return (
      metaRef.value.props.length ||
      metaRef.value.events.length ||
      metaRef.value.slots.length > 1
    );
  });
</script>
