<template>
  <main>
    <h1>Hi 🤗</h1>

    <section id="area">
      {{ placeholder }}
    </section>
  </main>
</template>

<script lang="ts" setup>
  const placeholder = "<ComponentToDevelop />";
</script>

<style>
  :root {
    --border: 1px solid #3c3f44;
    --border-radius: 0.25rem;
  }

  *,
  *::before,
  **::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  html {
    background-color: #1b1b1f;
    color: rgba(255, 255, 245, 0.86);
    font-family: sans-serif;
  }

  body {
    min-height: 100svh;
    text-rendering: optimizeLegibility;
    line-height: 1.7;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
    font-style: italic;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    line-height: 1;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  code {
    border-radius: 4px;
    padding: 3px 6px;
    line-height: 1.7;
    font-size: 0.875em;
    background-color: rgba(142, 150, 170, 0.14);
    text-transform: lowercase;
    color: #3bbe7f;
    font-weight: 600;
  }

  #area {
    padding: 2rem;
    border: 1px dashed #3c3f44;
    border-radius: var(--border-radius);
  }

  main {
    margin-inline: auto;
    display: grid;
    place-content: center;
    padding-top: 5rem;
    max-width: 60ch;
  }
</style>
