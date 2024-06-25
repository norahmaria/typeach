<template>
  <div class="component-preview vp-raw">
    <slot />
  </div>
</template>

<style>
  :root {
    --button-height: 2.25rem;

    --button-bg: var(--vp-button-alt-bg);
    --button-hover-bg: var(--vp-button-alt-hover-bg);

    --brand-button-bg: var(--vp-button-brand-bg);
    --brand-button-hover-bg: var(--vp-button-brand-hover-bg);
    --brand-button-text: var(--vp-button-brand-text);

    --text: var(--vp-button-alt-text);
    --dimmed-text: var(--vp-c-text-2);
    --dark-text: var(--vp-c-text-3);
    --fw-bold: 600;

    --brand-color: var(--vp-c-brand-1);
    --brand-color-dimmed: var(--vp-c-brand-2);
    --warning-color: var(--vp-c-yellow-3);
    --error-color: var(--vp-c-red-2);

    --bg: var(--vp-c-bg);
    --border: var(--vp-c-border);
    --divider: var(--vp-c-divider);
    --border-radius: 8px;

    --icon-size: 1.5rem;
    --icon-button-padding: 0.25rem;
    --button-icon-size: 1em;
    --gap: 0.5rem;

    --component-width: 12rem;

    --shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  .component-preview {
    box-sizing: border-box;
    display: grid;
    place-content: center;
    padding: 2.5em;
    border-radius: 8px;
    background: var(--vp-sidebar-bg-color);
    position: relative;
  }

  .component-preview
    > button:not(.peachy-switch__input):not(.peachy-select__trigger),
  .component-preview .tree-unload-button {
    border: none;
    border-radius: 10rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;

    height: var(--button-height);
    padding: 0.75em 1.25em;

    background: var(--button-bg);

    font-size: 90%;
    color: var(--color);
    line-height: 1;

    cursor: pointer;

    transition:
      background 0.25s,
      opacity 0.25s;
  }

  .component-preview .tree-unload-button:hover,
  .component-preview .tree-unload-button:focus,
  .component-preview
    > button:hover:not(.peachy-switch__input:not(.peachy-select__trigger)),
  .component-preview
    > button:focus-visible:not(.peachy-switch__input):not(
      .peachy-select__trigger
    ) {
    background: var(--button-hover-bg);
  }

  .component-preview
    > button:disabled:not(.peachy-switch__input):not(.peachy-select__trigger),
  .component-preview
    > button[aria-disabled="true"]:not(.peachy-switch__input):not(
      .peachy-select__trigger
    ) {
    pointer-events: none;
    cursor: normal;
    opacity: 0.5;
  }

  .component-preview svg {
    height: 1em;
    width: 1em;
  }

  .component-preview * {
    font-weight: 100%;
    box-sizing: border-box;
  }

  svg path {
    stroke: var(--text);
  }
</style>
