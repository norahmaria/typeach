<template>
  <Page :title="title" description="A button of information">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <ToggletipExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Toggletip" />
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

  import ToggletipExample from "./Toggletip.example.vue";

  import AnatomyContent from "./markdown/toggletip-anatomy.md";
  import StylingContent from "./markdown/toggletip-styling.md";
  import AccessibilityContent from "./markdown/toggletip-accessibility.md";
  import ResourcesContent from "./markdown/toggletip-resources.md";

  import SFC from "./Toggletip.example.vue?raw";
  import CSS from "./toggletip.css?raw";

  import rootMeta from "../Toggletip.vue?types";
  import targetMeta from "../ToggletipTarget.vue?types";
  import triggerMeta from "../ToggletipTrigger.vue?types";

  const title = "Toggletip";
</script>
