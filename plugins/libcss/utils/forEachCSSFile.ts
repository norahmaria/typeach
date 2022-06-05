import { ResolvedConfig } from 'vite'
import { resolve } from 'path'

import type { File } from '../types/File'

export const forEachCSSFile = (
  viteConfig: ResolvedConfig,
  bundle: unknown,
  callback: (paths: { root: string; css: string[]; component: string }) => void
) => {
  const outDir = viteConfig.build.outDir || 'dist'

  const files = Object.values(bundle).map((file: File) => ({
    name: file.name,
    path: file.fileName,
  }))

  for (const file of files) {
    if (!file.name.endsWith('.css')) continue

    const [name] = file.path.split('.')

    const [jsFile] = files.filter(
      it => it.name.startsWith(name) && it.path.endsWith('.js')
    )

    const root = resolve(viteConfig.root, outDir)

    const component = resolve(root, jsFile.path.split('index.es.js')[0])

    const css = resolve(component, `${name}.css`)

    const paths = {
      root,
      css: [resolve(root, file.path), css],
      component,
    }

    callback(paths)
  }
}
