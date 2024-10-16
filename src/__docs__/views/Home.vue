<template>
  <Page
    :sections="['Getting started', 'Roadmap']"
    title="Typeach "
    description="A very opinionated accessible component library">
    <template #getting-started>
      <highlightjs :code="`npm i typeach`" />

      <p>
        Typeach is a work in progress and might drastically change without
        warning ☺️
      </p>
    </template>

    <template #roadmap>
      You can pay attention to the goals on our
      <a href="https://github.com/users/norahmaria/projects/4/views/1">
        project page
      </a>
      on
      <a href="https://github.com/norahmaria/typeach">Github</a>
      . Feel free to contribute or raise an issue if you spot anything or have
      feedback!
    </template>
  </Page>
</template>

<script lang="ts" setup>
  import Page from "../components/Page.vue";
</script>
