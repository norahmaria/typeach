import { UserConfigExport, Plugin } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'

/* eslint-disable */
// @ts-ignore
import libcss from './plugins/libcss'
/* eslint-enable */

export function defineVite(
  dirname: string,
  override?: UserConfigExport
): UserConfigExport {
  return {
    plugins: [vue(), libcss() as Plugin],
    build: {
      lib: {
        entry: path.resolve(dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: (id: string) => {
          if (id === 'plugin-vue:export-helper') return false
          return !id.startsWith('.') && !path.isAbsolute(id)
        },
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    ...override,
  }
}
