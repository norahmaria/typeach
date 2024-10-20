<template>
  <Page :title="title" description="A popular way to present file structure">
    <template #preview>
      <div class="note note--warning">
        <div class="note__title">Must be controlled.</div>

        <p>
          This component only deals with keyboard navigation, the opening and
          closing of items, and letting you know when to toggle an item's
          selected state - but does not deal with the selection itself.
        </p>

        <p>
          This is done because an item's children are not rendered until you
          open it - meaning it would be difficult for the component to know the
          entire state of the tree.
        </p>
      </div>

      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <TreeExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Tree" />
      <ComponentApi :meta="itemMeta" title="Item" />
      <ComponentApi :meta="itemLabelMeta" title="Item Label" />
      <ComponentApi :meta="itemIndicatorMeta" title="Item Indicator" />
    </template>

    <template #styling>
      <StylingContent />
    </template>

    <template #accessibility>
      <AccessibilityContent />
    </template>

    <template #resources>
      <ResourcesContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "@docs/components/Page.vue";
  import ComponentPreview from "@docs/components/ComponentPreview.vue";
  import ComponentApi from "@docs/components/ComponentApi.vue";

  import TreeExample from "./Tree.example.vue";

  import AnatomyContent from "./markdown/tree-anatomy.md";
  import StylingContent from "./markdown/tree-styling.md";
  import AccessibilityContent from "./markdown/tree-accessibility.md";
  import ResourcesContent from "./markdown/tree-resources.md";

  import SFC from "./Tree.example.vue?raw";
  import CSS from "./tree.css?raw";

  import rootMeta from "../Tree.vue?types";
  import itemMeta from "../TreeItem.vue?types";
  import itemIndicatorMeta from "../TreeItemIndicator.vue?types";
  import itemLabelMeta from "../TreeItemLabel.vue?types";

  const title = "Tree";
</script>
