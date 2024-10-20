<template>
  <Page :title="title" is-input description="Pick your favorites">
    <template #preview>
      <div class="note note--warning">
        <div class="note__title">Do you need a custom styled select?</div>

        <p>
          Custom select elements are infamously inaccessible. If you can use a
          native select instead, please do so! There's a great article on this
          by Sarah Higley -
          <a href="https://sarahmhigley.com/writing/select-your-poison/">
            {{ "\<select\> your poison" }}.
          </a>
          .
        </p>
      </div>

      <ComponentPreview :sfc="SFC" :css="CSS" :name="title">
        <SelectExample />
      </ComponentPreview>
    </template>

    <template #anatomy>
      <AnatomyContent />
    </template>

    <template #api>
      <ComponentApi :meta="inputMeta" title="Input">
        <p>
          There is no
          <code>disabled</code>
          or
          <code>readonly</code>
          state for the input, you're expected to disable the trigger directly.
        </p>
      </ComponentApi>

      <ComponentApi :meta="triggerMeta" title="Trigger" />
      <ComponentApi :meta="targetMeta" title="Target" />
      <ComponentApi :meta="listMeta" title="List" />
      <ComponentApi :meta="labelMeta" title="Label" />
      <ComponentApi :meta="separatorMeta" title="Separator" />
      <ComponentApi :meta="itemMeta" title="Item" />
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

  import SelectExample from "./Select.example.vue";

  import AnatomyContent from "./markdown/select-anatomy.md";
  import StylingContent from "./markdown/select-styling.md";
  import AccessibilityContent from "./markdown/select-accessibility.md";
  import ResourcesContent from "./markdown/select-resources.md";

  import SFC from "./Select.example.vue?raw";
  import CSS from "./select.css?raw";

  import indicatorMeta from "../SelectIndicator.vue?types";
  import inputMeta from "../SelectInput.vue?types";
  import itemMeta from "../SelectItem.vue?types";
  import labelMeta from "../SelectLabel.vue?types";
  import listMeta from "../SelectList.vue?types";
  import separatorMeta from "../SelectSeparator.vue?types";
  import targetMeta from "../SelectTarget.vue?types";
  import triggerMeta from "../SelectTrigger.vue?types";

  const title = "Select";
</script>
