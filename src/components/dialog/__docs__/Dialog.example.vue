<template>
  <PeachyDialog.Dialog>
    <PeachyDialog.Trigger>Open</PeachyDialog.Trigger>

    <PeachyDialog.Target>
      <PeachyDialog.Close aria-label="Close">
        <unicon name="times" />
      </PeachyDialog.Close>

      <PeachyDialog.Title>Title</PeachyDialog.Title>

      <PeachyDialog.Description>Description</PeachyDialog.Description>

      Content
    </PeachyDialog.Target>
  </PeachyDialog.Dialog>
</template>

<script lang="ts" setup>
  import { PeachyDialog } from "typeach";
</script>

<style src="./dialog.css" />
