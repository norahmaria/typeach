<template>
  <div id="deeply-nested">
    <PeachyHierarchyTitle>
      <template #title>H2</template>

      <PeachyHierarchyTitle>
        <template #title>H3</template>

        <PeachyHierarchyTitle>
          <template #title>H4</template>

          <PeachyHierarchyTitle>
            <template #title>H5</template>

            <PeachyHierarchyTitle>
              <template #title>H6</template>

              <PeachyHierarchyTitle>
                <template #title>P</template>
              </PeachyHierarchyTitle>
            </PeachyHierarchyTitle>
          </PeachyHierarchyTitle>
        </PeachyHierarchyTitle>
      </PeachyHierarchyTitle>
    </PeachyHierarchyTitle>
  </div>

  <div id="manual">
    <PeachyHierarchyTitle is="h4">
      <template #title>H4</template>

      <PeachyHierarchyTitle>
        <template #title>H5</template>
      </PeachyHierarchyTitle>
    </PeachyHierarchyTitle>
  </div>

  <div id="as-parent">
    <PeachyHierarchyTitle is="h4">
      <PeachyHierarchyTitle as-parent>
        <template #title>H4</template>
      </PeachyHierarchyTitle>
    </PeachyHierarchyTitle>
  </div>
</template>

<script lang="ts" setup>
  import { PeachyHierarchyTitle } from "../";
</script>
