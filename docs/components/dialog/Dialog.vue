<!-- #region snippet -->
<template>
  <PeachyDialog.Dialog>
    <PeachyDialog.Trigger>Open</PeachyDialog.Trigger>

    <Teleport to="body">
      <PeachyDialog.Target>
        <PeachyDialog.Close aria-label="Close">
          <CrossSvg />
        </PeachyDialog.Close>

        <PeachyDialog.Title>Title</PeachyDialog.Title>

        <PeachyDialog.Description>Description</PeachyDialog.Description>

        Content
      </PeachyDialog.Target>
    </Teleport>
  </PeachyDialog.Dialog>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { PeachyDialog } from "@/index";

  import CrossSvg from "./CrossSvg.vue";
</script>
