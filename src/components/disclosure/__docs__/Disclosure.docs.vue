<template>
  <Page :title="title" description="Hide and show content">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <DisclosureExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Disclosure" />
      <ComponentApi :meta="triggerMeta" title="Trigger" />
      <ComponentApi :meta="targetMeta" title="Target" />
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

  import DisclosureExample from "./Disclosure.example.vue";

  import AnatomyContent from "./markdown/disclosure-anatomy.md";
  import StylingContent from "./markdown/disclosure-styling.md";
  import AccessibilityContent from "./markdown/disclosure-accessibility.md";
  import ResourcesContent from "./markdown/disclosure-resources.md";

  import SFC from "./Disclosure.example.vue?raw";
  import CSS from "./disclosure.css?raw";

  import rootMeta from "../Disclosure.vue?types";
  import triggerMeta from "../DisclosureTrigger.vue?types";
  import targetMeta from "../DisclosureTarget.vue?types";

  const title = "Disclosure";
</script>
