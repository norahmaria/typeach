/// <reference types="vitest" />

import { resolve, isAbsolute } from 'path'

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import libcss from './plugins/libcss'

export default defineConfig({
  plugins: [vue(), libcss() as Plugin],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id: string) => {
        if (id === 'plugin-vue:export-helper') return false
        return !id.startsWith('.') && !isAbsolute(id)
      },
      output: {
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
