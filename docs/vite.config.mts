import { join } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { plugins } from "./plugins";

const source = fileURLToPath(new URL("../src", import.meta.url));

export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), plugins()],

  base: "/typeach/",
  assetsInclude: ["*.css"],
  publicDir: join(source, "/__docs__/public"),

  resolve: {
    alias: {
      "@": source,
      typeach: join(source, "/index.ts"),
      "@icons": join(source, "/__docs__/icons"),
      "@docs": join(source, "/__docs__"),
    },
  },

  build: {
    cssMinify: false,
    cssCodeSplit: false,
  },
});
