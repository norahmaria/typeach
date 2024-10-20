<template>
  <Page :title="title" description="Providing information for some">
    <template #preview>
      <div class="note note--warning">
        <div class="note__title">Unusable on touch devices.</div>
        <p>
          For a touch-friendly alternative, check out
          <RouterLink :to="{ name: 'toggletip' }">Toggletip</RouterLink>
          .
        </p>
      </div>

      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <TooltipExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Tooltip" />
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

  import TooltipExample from "./Tooltip.example.vue";

  import AnatomyContent from "./markdown/tooltip-anatomy.md";
  import StylingContent from "./markdown/tooltip-styling.md";
  import AccessibilityContent from "./markdown/tooltip-accessibility.md";
  import ResourcesContent from "./markdown/tooltip-resources.md";

  import SFC from "./Tooltip.example.vue?raw";
  import CSS from "./tooltip.css?raw";

  import rootMeta from "../Tooltip.vue?types";
  import targetMeta from "../TooltipTarget.vue?types";
  import triggerMeta from "../TooltipTrigger.vue?types";

  const title = "Tooltip";
</script>
