<template>
  <header>
    <Navbar />
  </header>

  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
  import Navbar from "./Navbar.vue";
</script>
