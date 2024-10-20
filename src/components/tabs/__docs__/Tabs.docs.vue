<template>
  <Page :title="title" description="A collection of 'pages'">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <TabsExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Tabs" />
      <ComponentApi :meta="titleMeta" title="Title" />

      <ComponentApi
        :meta="intervalControllerMeta"
        title="Interval Controller" />

      <ComponentApi :meta="navigationButtonMeta" title="Navigation Button" />
      <ComponentApi :meta="listMeta" title="List" />

      <ComponentApi :meta="listItemMeta" title="List Item">
        <div class="note note--warning">
          <p>Should math id with the panel associated.</p>
        </div>
      </ComponentApi>

      <ComponentApi :meta="panelMeta" title="Panel">
        <div class="note note--warning">
          <p>Should math id with the list item associated.</p>
        </div>
      </ComponentApi>
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

  import TabsExample from "./Tabs.example.vue";

  import AnatomyContent from "./markdown/tabs-anatomy.md";
  import StylingContent from "./markdown/tabs-styling.md";
  import AccessibilityContent from "./markdown/tabs-accessibility.md";
  import ResourcesContent from "./markdown/tabs-resources.md";

  import SFC from "./Tabs.example.vue?raw";
  import CSS from "./tabs.css?raw";

  import rootMeta from "../Tabs.vue?types";
  import intervalControllerMeta from "../TabsIntervalController.vue?types";
  import listMeta from "../TabsList.vue?types";
  import listItemMeta from "../TabsListItem.vue?types";
  import navigationButtonMeta from "../TabsNavigationButton.vue?types";
  import panelMeta from "../TabsPanel.vue?types";
  import titleMeta from "../TabsTitle.vue?types";

  const title = "Tabs";
</script>
