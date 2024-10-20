<template>
  <PeachyHierarchyTitle>
    <template #title>A H2 heading</template>

    <PeachyHierarchyTitle>
      <template #title>A H3 heading</template>
    </PeachyHierarchyTitle>

    <PeachyHierarchyTitle>
      <template #title>A H3 heading</template>
    </PeachyHierarchyTitle>
  </PeachyHierarchyTitle>

  <PeachyHierarchyTitle>
    <template #title>A H2 heading</template>

    <PeachyHierarchyTitle>
      <template #title>A H3 heading</template>

      <PeachyHierarchyTitle>
        <template #title>A H4 heading</template>
      </PeachyHierarchyTitle>
    </PeachyHierarchyTitle>
  </PeachyHierarchyTitle>
</template>

<script lang="ts" setup>
  import { PeachyHierarchyTitle } from "typeach";
</script>

<style src="./hierarchy-title.css" />
