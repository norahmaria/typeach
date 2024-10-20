<template>
  <Page
    :title="title"
    is-input
    description="For picking a single out of the many">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <RadioExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Radio" />
      <ComponentApi :meta="inputMeta" title="Input" />
      <ComponentApi :meta="inputLabelMeta" title="Input Label" />
      <ComponentApi :meta="indicatorMeta" title="Indicator" />
      <ComponentApi :meta="labelMeta" title="Label" />
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

  import RadioExample from "./Radio.example.vue";

  import AnatomyContent from "./markdown/radio-anatomy.md";
  import StylingContent from "./markdown/radio-styling.md";
  import AccessibilityContent from "./markdown/radio-accessibility.md";
  import ResourcesContent from "./markdown/radio-resources.md";

  import SFC from "./Radio.example.vue?raw";
  import CSS from "./radio.css?raw";

  import rootMeta from "../Radio.vue?types";
  import indicatorMeta from "../RadioIndicator.vue?types";
  import inputMeta from "../RadioInput.vue?types";
  import inputLabelMeta from "../RadioInputLabel.vue?types";
  import labelMeta from "../RadioLabel.vue?types";

  const title = "Radio";
</script>
