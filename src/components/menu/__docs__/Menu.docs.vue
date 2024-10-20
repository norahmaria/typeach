<template>
  <Page :title="title" description="A dropdown menu">
    <template #preview>
      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <MenuExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Menu" />
      <ComponentApi :meta="triggerMeta" title="Trigger" />
      <ComponentApi :meta="targetMeta" title="Target" />
      <ComponentApi :meta="listMeta" title="List" />
      <ComponentApi :meta="itemMeta" title="Item" />
      <ComponentApi :meta="labelMeta" title="Label" />
      <ComponentApi :meta="checkboxItemMeta" title="Checkbox Item" />
      <ComponentApi :meta="separatorMeta" title="Separator" />
      <ComponentApi :meta="radioGroupMeta" title="Radio Group" />
      <ComponentApi :meta="radioItemMeta" title="Radio Item" />
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

  import MenuExample from "./Menu.example.vue";

  import AnatomyContent from "./markdown/menu-anatomy.md";
  import StylingContent from "./markdown/menu-styling.md";
  import AccessibilityContent from "./markdown/menu-accessibility.md";
  import ResourcesContent from "./markdown/menu-resources.md";

  import SFC from "./Menu.example.vue?raw";
  import CSS from "./menu.css?raw";

  import rootMeta from "../Menu.vue?types";
  import checkboxItemMeta from "../MenuCheckboxItem.vue?types";
  import itemMeta from "../MenuItem.vue?types";
  import labelMeta from "../MenuLabel.vue?types";
  import listMeta from "../MenuList.vue?types";
  import radioGroupMeta from "../MenuRadioGroup.vue?types";
  import radioItemMeta from "../MenuRadioItem.vue?types";
  import separatorMeta from "../MenuSeparator.vue?types";
  import targetMeta from "../MenuTarget.vue?types";
  import triggerMeta from "../MenuTrigger.vue?types";

  const title = "Menu";
</script>
