<template>
  <Page :title="title" description="A wrapper for inputs">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <InputExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="groupMeta" title="Group" />
      <ComponentApi :meta="groupLabelMeta" title="Group Label" />
      <ComponentApi :meta="rootMeta" title="Input" />
      <ComponentApi :meta="labelMeta" title="Label" />
      <ComponentApi :meta="descriptionMeta" title="Description" />
      <ComponentApi :meta="errorMeta" title="Error" />
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

  import InputExample from "./Input.example.vue";

  import AnatomyContent from "./markdown/input-anatomy.md";
  import AccessibilityContent from "./markdown/input-accessibility.md";
  import ResourcesContent from "./markdown/input-resources.md";

  import SFC from "./Input.example.vue?raw";
  import CSS from "./input.css?raw";

  import rootMeta from "../Input.vue?types";
  import descriptionMeta from "../InputDescription.vue?types";
  import errorMeta from "../InputError.vue?types";
  import groupMeta from "../InputGroup.vue?types";
  import groupLabelMeta from "../InputGroupLabel.vue?types";
  import labelMeta from "../InputLabel.vue?types";

  const title = "Input";
</script>
