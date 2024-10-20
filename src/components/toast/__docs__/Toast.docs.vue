<template>
  <Page :title="title" description="A 'notification'">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <ToastExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Toast" />
      <ComponentApi :meta="actionMeta" title="Action" />
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

  import ToastExample from "./Toast.example.vue";

  import AnatomyContent from "./markdown/toast-anatomy.md";
  import StylingContent from "./markdown/toast-styling.md";
  import AccessibilityContent from "./markdown/toast-accessibility.md";
  import ResourcesContent from "./markdown/toast-resources.md";

  import SFC from "./Toast.example.vue?raw";
  import CSS from "./toast.css?raw";

  import rootMeta from "../Toast.vue?types";
  import actionMeta from "../ToastAction.vue?types";
  import closeMeta from "../ToastClose.vue?types";

  const title = "Toast";
</script>
