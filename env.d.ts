/// <reference types="vite/client" />

declare module "*.md" {
  import type { Component } from "vue";
  const component: Component;
  export default component;
}

declare module "*=raw" {
  const source: string | undefined;
  export default source;
}

declare module "*.vue?types" {
  import type { ComponentMeta } from "vue-component-meta";
  const types: ComponentMeta | undefined;
  export default types;
}

declare module "@mdit-vue/types" {
  interface MarkdownItEnv {
    /**
     * SFC blocks extracted by `@mdit-vue/plugin-sfc`
     */
    sfcBlocks?: MarkdownSfcBlocks;

    /**
     * An absolute path to the current markdown file
     */
    realPath: string;
  }
}
