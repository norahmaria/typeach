import { UserConfigExport, Plugin } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libcss from './plugins/libcss'

export function defineVite(
  dirname: string,
  override?: UserConfigExport
): UserConfigExport {
  return {
    plugins: [vue(), dts(), libcss() as Plugin],
    build: {
      lib: {
        entry: path.resolve(dirname, 'src/index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
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
