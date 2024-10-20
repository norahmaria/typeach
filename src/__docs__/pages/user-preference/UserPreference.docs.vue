<template>
  <Page
    :sections="['Preferences', 'Customization']"
    title="User preferences"
    description="Respecting user wishes">
    <template #preferences>
      <PreferencesContent />
    </template>

    <template #customization>
      <UserCustomizationContent />
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "../../components/Page.vue";

  import PreferencesContent from "./markdown/preferences.md";
  import UserCustomizationContent from "./markdown/user-customization.md";
</script>
