<template>
  <Page :title="title" is-input description="A box you can check">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <CheckboxExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <div class="note note--warning">
        <div class="note__title">Do not control a parent checkbox.</div>

        <p>
          You should never manually set a parent checkbox's state - they are
          there as helpers for mass-edits, but are not intended to be
          controlled. A parent changes depending on it's children, so you might
          get unexpected results trying to override this.
        </p>
      </div>

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

  import CheckboxExample from "./Checkbox.example.vue";

  import AnatomyContent from "./markdown/checkbox-anatomy.md";
  import StylingContent from "./markdown/checkbox-styling.md";
  import AccessibilityContent from "./markdown/checkbox-accessibility.md";
  import ResourcesContent from "./markdown/checkbox-resources.md";

  import SFC from "./Checkbox.example.vue?raw";
  import CSS from "./checkbox.css?raw";

  import inputMeta from "../CheckboxInput.vue?types";
  import indicatorMeta from "../CheckboxIndicator.vue?types";

  const title = "Checkbox";
</script>
