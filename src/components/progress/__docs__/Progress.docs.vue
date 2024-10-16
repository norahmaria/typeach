<template>
  <Page :title="title" description="An indicator of progress">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <ProgressExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Progress" />
      <ComponentApi :meta="labelMeta" title="Label" />
    </template>

    <template #styling>
      <StylingContent />
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

  import ProgressExample from "./Progress.example.vue";

  import AnatomyContent from "./markdown/progress-anatomy.md";
  import StylingContent from "./markdown/progress-styling.md";
  import ResourcesContent from "./markdown/progress-resources.md";

  import SFC from "./Progress.example.vue?raw";
  import CSS from "./progress.css?raw";

  import rootMeta from "../Progress.vue?types";
  import labelMeta from "../ProgressLabel.vue?types";

  const title = "Progress";
</script>
