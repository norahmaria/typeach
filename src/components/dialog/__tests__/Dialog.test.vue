<template>
  <PeachyDialog.Dialog>
    <PeachyDialog.Trigger id="trigger">Open</PeachyDialog.Trigger>

    <PeachyDialog.Target id="target">
      <PeachyDialog.Title id="title">Title</PeachyDialog.Title>
      <PeachyDialog.Description id="description">
        Description
      </PeachyDialog.Description>

      Content
    </PeachyDialog.Target>
  </PeachyDialog.Dialog>
</template>

<script lang="ts" setup>
  import { PeachyDialog } from "../";
</script>
