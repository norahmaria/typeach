<!-- #region snippet -->
<template>
  <div class="hierarchy-title">
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
  </div>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { PeachyHierarchyTitle } from "../../../src";
</script>