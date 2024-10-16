<template>
  <Page
    :sections="['Discoverability']"
    title="User guides"
    description="Ensuring users know how to use your site">
    <template #discoverability>
      <DiscoverabilityContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "../../components/Page.vue";

  import DiscoverabilityContent from "./markdown/discoverability.md";
</script>
