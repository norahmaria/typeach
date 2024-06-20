import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: resolve(__dirname, "tsconfig.app.json") }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    cssCodeSplit: true,

    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "typeach",
      formats: ["es", "cjs", "umd"],
      fileName: format => `typeach.${format}.js`,
    },

    rollupOptions: {
      external: ["vue"],

      output: {
        exports: "named",

        globals: {
          vue: "Vue",
        },

        assetFileNames: assetInfo => assetInfo.name ?? "",
      },
    },
  },
});
