/// <reference types="vitest" />

import { resolve, isAbsolute } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import libcss from './plugins/libcss/libcss'

export default defineConfig({
  plugins: [vue(), libcss()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (id: string) => {
        if (id === 'plugin-vue:export-helper') return false
        return !id.startsWith('.') && !isAbsolute(id)
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: ({ name }) => {
          if (name.endsWith('.css')) {
            const [componentName] = name.split('.')
            return `${componentName}.css`
          } else {
            return name
          }
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'verbose',
  },
})
