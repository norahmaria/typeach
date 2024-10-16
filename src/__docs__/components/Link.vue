<template>
  <RouterLink v-if="routerLink" :to="routerLink">
    <slot />
  </RouterLink>

  <a v-else-if="href" :href="href">
    <slot />
  </a>
</template>

<script lang="ts" setup>
  import { toRefs, computed } from "vue";
  import type { RouteLocationRaw } from "vue-router";

  export interface LinkProps {
    page?: string;
    to?: RouteLocationRaw;
    href?: string;
  }

  const props = defineProps<LinkProps>();

  const propsRef = toRefs(props);

  const routerLink = computed(() => {
    if (propsRef.page.value) {
      return {
        name: propsRef.page.value,
      };
    }

    return propsRef.to.value;
  });
</script>
