<template>
  <Page
    :sections="['Classes', 'Transitions', 'Icons']"
    title="Styling"
    description="Styling your components">
    <template #classes>
      <ClassesContent />
    </template>

    <template #transitions>
      <TransitionsContent />
    </template>

    <template #icons>
      All icons used in the examples are from
      <a href="https://antonreshetov.github.io/vue-unicons/">Vue Unicons</a>
      .
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "../../components/Page.vue";

  import ClassesContent from "./markdown/styling-classes.md";
  import TransitionsContent from "./markdown/styling-transitions.md";
</script>
