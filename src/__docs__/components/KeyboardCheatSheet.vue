<template>
  <ul class="keyboard-cheat-sheet">
    <li v-for="(shortcut, i) in shortcuts" :key="i" class="keyboard-shortcut">
      <span
        v-html="
          shortcut.keys
            .map(key =>
              key
                .map(
                  i => `<kbd class='${i === 'Space' ? 'space' : ''}'>${i}</kbd>`
                )
                .join(' + ')
            )
            .join(' / ')
        " />

      <p style="font-weight: 600">
        {{ shortcut.description }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  export interface KeyboardCheatSheetProps {
    shortcuts: {
      keys: string[][];
      description: string;
    }[];
  }

  defineProps<KeyboardCheatSheetProps>();
</script>

<style>
  .keyboard-cheat-sheet {
    --grid-gap: 3rem;
    --grid-border-offset: calc(var(--grid-gap) / 2);
    --grid-border-thickness: 1px;
    --grid-border-color: #eee;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--grid-gap);
    overflow: hidden;

    margin-inline: 0;
  }

  .keyboard-shortcut {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;

    max-width: 25ch;
    padding-block: 0.5rem;
    font-size: 1rem;

    position: relative;
  }

  .keyboard-shortcut::before,
  .keyboard-shortcut::after {
    content: "";
    position: absolute;
    background-color: var(--grid-border-color);
    z-index: 1;
  }

  .keyboard-shortcut::after {
    inline-size: 100vw;
    block-size: var(--grid-border-thickness);
    inset-inline-start: 0;
    inset-block-start: calc(var(--grid-border-offset) * -1);
  }

  .keyboard-shortcut::before {
    inline-size: var(--grid-border-thickness);
    block-size: 100vh;
    inset-block-start: 0;
    inset-inline-start: calc(var(--grid-border-offset) * -1);
  }

  .keyboard-shortcut > :is(span, p) {
    font-size: 1rem;
  }
</style>
