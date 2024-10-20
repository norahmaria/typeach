// vite.config.mts
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/norah/Projects/typeach/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.5/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/norah/Projects/typeach/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.1_vue@3.4.29/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///Users/norah/Projects/typeach/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.5_typescript@5.4.5_vite@5.3.1/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/norah/Projects/typeach";
var __vite_injected_original_import_meta_url = "file:///Users/norah/Projects/typeach/vite.config.mts";
var source = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: resolve(__vite_injected_original_dirname, "tsconfig.app.json") })
  ],
  resolve: {
    alias: {
      "@": source
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "typeach",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `typeach.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
        assetFileNames: (assetInfo) => assetInfo.name ?? ""
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL25vcmFoL1Byb2plY3RzL3R5cGVhY2hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9ub3JhaC9Qcm9qZWN0cy90eXBlYWNoL3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbm9yYWgvUHJvamVjdHMvdHlwZWFjaC92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5cbmNvbnN0IHNvdXJjZSA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgZHRzKHsgdHNjb25maWdQYXRoOiByZXNvbHZlKF9fZGlybmFtZSwgXCJ0c2NvbmZpZy5hcHAuanNvblwiKSB9KSxcbiAgXSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBzb3VyY2UsXG4gICAgfSxcbiAgfSxcblxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcblxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcbiAgICAgIG5hbWU6IFwidHlwZWFjaFwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIiwgXCJ1bWRcIl0sXG4gICAgICBmaWxlTmFtZTogZm9ybWF0ID0+IGB0eXBlYWNoLiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIl0sXG5cbiAgICAgIG91dHB1dDoge1xuICAgICAgICBleHBvcnRzOiBcIm5hbWVkXCIsXG5cbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogXCJWdWVcIixcbiAgICAgICAgfSxcblxuICAgICAgICBhc3NldEZpbGVOYW1lczogYXNzZXRJbmZvID0+IGFzc2V0SW5mby5uYW1lID8/IFwiXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlEsU0FBUyxlQUFlO0FBQ25TLFNBQVMsZUFBZSxXQUFXO0FBRW5DLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFOaEIsSUFBTSxtQ0FBbUM7QUFBMEgsSUFBTSwyQ0FBMkM7QUFRcE4sSUFBTSxTQUFTLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUU5RCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJLEVBQUUsY0FBYyxRQUFRLGtDQUFXLG1CQUFtQixFQUFFLENBQUM7QUFBQSxFQUMvRDtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsSUFFZCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLE1BQzVCLFVBQVUsWUFBVSxXQUFXLE1BQU07QUFBQSxJQUN2QztBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUVoQixRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFFVCxTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBRUEsZ0JBQWdCLGVBQWEsVUFBVSxRQUFRO0FBQUEsTUFDakQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
