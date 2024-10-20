<template>
  <Page :title="title" description="Automatic title levelling">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <HierarchyTitleExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Hierarchy Title" />
    </template>

    <template #styling>
      <StylingContent />
    </template>

    <template #accessibility>
      <AccessibilityContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "@docs/components/Page.vue";
  import ComponentPreview from "@docs/components/ComponentPreview.vue";
  import ComponentApi from "@docs/components/ComponentApi.vue";

  import HierarchyTitleExample from "./HierarchyTitle.example.vue";

  import AnatomyContent from "./markdown/hierarchy-title-anatomy.md";
  import StylingContent from "./markdown/hierarchy-title-styling.md";
  import AccessibilityContent from "./markdown/hierarchy-title-accessibility.md";

  import SFC from "./HierarchyTitle.example.vue?raw";
  import CSS from "./hierarchy-title.css?raw";

  import rootMeta from "../HierarchyTitle.vue?types";

  const title = "Hierarchy Title";
</script>
