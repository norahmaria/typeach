<template>
  <PeachyDisclosure.Disclosure>
    <PeachyDisclosure.Trigger>
      Disclosure

      <unicon name="angle-down" />
    </PeachyDisclosure.Trigger>

    <Transition name="disclosure">
      <PeachyDisclosure.Target>
        <p>Content</p>
      </PeachyDisclosure.Target>
    </Transition>
  </PeachyDisclosure.Disclosure>
</template>

<script lang="ts" setup>
  import { PeachyDisclosure } from "typeach";
</script>

<style src="./disclosure.css" />
