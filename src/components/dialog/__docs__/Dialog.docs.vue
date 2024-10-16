<template>
  <Page :title="title" description="A pop-up">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <DialogExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Dialog" />
      <ComponentApi :meta="triggerMeta" title="Trigger" />
      <ComponentApi :meta="targetMeta" title="Target" />
      <ComponentApi :meta="titleMeta" title="Title" />
      <ComponentApi :meta="descriptionMeta" title="Description" />
      <ComponentApi :meta="closeMeta" title="Close" />
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

  import DialogExample from "./Dialog.example.vue";

  import AnatomyContent from "./markdown/dialog-anatomy.md";
  import StylingContent from "./markdown/dialog-styling.md";
  import AccessibilityContent from "./markdown/dialog-accessibility.md";
  import ResourcesContent from "./markdown/dialog-resources.md";

  import SFC from "./Dialog.example.vue?raw";
  import CSS from "./dialog.css?raw";

  import rootMeta from "../Dialog.vue?types";
  import triggerMeta from "../DialogTrigger.vue?types";
  import targetMeta from "../DialogTarget.vue?types";
  import titleMeta from "../DialogTitle.vue?types";
  import descriptionMeta from "../DialogDescription.vue?types";
  import closeMeta from "../DialogClose.vue?types";

  const title = "Dialog";
</script>
