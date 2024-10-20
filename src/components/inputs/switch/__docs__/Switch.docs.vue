<template>
  <Page
    :title="title"
    is-input
    description="A virtual representation of 'yes or no'">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <SwitchExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="inputMeta" title="Input" />
      <ComponentApi :meta="indicatorMeta" title="Indicator" />
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

  import SwitchExample from "./Switch.example.vue";

  import AnatomyContent from "./markdown/switch-anatomy.md";
  import StylingContent from "./markdown/switch-styling.md";
  import AccessibilityContent from "./markdown/switch-accessibility.md";
  import ResourcesContent from "./markdown/switch-resources.md";

  import SFC from "./Switch.example.vue?raw";
  import CSS from "./switch.css?raw";

  import inputMeta from "../SwitchInput.vue?types";
  import indicatorMeta from "../SwitchIndicator.vue?types";

  const title = "Switch";
</script>
