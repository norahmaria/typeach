<template>
  <Page :title="title" is-input description="For basic input">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <TextInputExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="inputMeta" title="Input" />
    </template>

    <template #styling>
      <StylingContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "@docs/components/Page.vue";
  import ComponentPreview from "@docs/components/ComponentPreview.vue";
  import ComponentApi from "@docs/components/ComponentApi.vue";

  import TextInputExample from "./TextInput.example.vue";

  import AnatomyContent from "./markdown/text-input-anatomy.md";
  import StylingContent from "./markdown/text-input-styling.md";

  import SFC from "./TextInput.example.vue?raw";
  import CSS from "./text-input.css?raw";

  import inputMeta from "../TextInput.vue?types";

  const title = "Text Input";
</script>
