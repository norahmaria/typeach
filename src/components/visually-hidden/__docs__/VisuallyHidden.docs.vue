<template>
  <Page :title="title" description="Provide text accessible by screen readers">
    <template #preview>
      <div class="note note--warning">
        <div class="note__title">Do not use for interactive elements.</div>
        <p>
          Should not be used to hide interactive elements (e.g. inputs), as this
          will make it disappear for screen readers too due to the styling for
          <code>height</code>
          and
          <code>width</code>
          being
          <code>1px</code>
          . This component is intended for hiding text that might feel excessive
          visually but is necessary if one can't see the visuals.
        </p>
      </div>
    </template>

    <template #api>
      <ComponentApi :meta="rootMeta" title="Visually Hidden" />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "@docs/components/Page.vue";
  import ComponentApi from "@docs/components/ComponentApi.vue";

  import rootMeta from "../VisuallyHidden.vue?types";

  const title = "Visually Hidden";
</script>
