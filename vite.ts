import { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-dts'

import path from 'path'

export function defineVite(
  dirname: string,
  override?: UserConfigExport
): UserConfigExport {
  return {
    plugins: [vue(), dts()],
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
