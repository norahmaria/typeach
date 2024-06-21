<!-- #region snippet -->
<template>
  <PeachyDisclosure.Disclosure>
    <PeachyDisclosure.Trigger>
      Disclosure

      <ChevronSvg />
    </PeachyDisclosure.Trigger>

    <Transition name="disclosure">
      <PeachyDisclosure.Target>
        <p>Content</p>
      </PeachyDisclosure.Target>
    </Transition>
  </PeachyDisclosure.Disclosure>
</template>
<!-- #endregion snippet -->

<script lang="ts" setup>
  import { PeachyDisclosure } from "@/index";

  import ChevronSvg from "./ChevronSvg.vue";
</script>
