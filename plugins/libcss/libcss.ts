import { readFileSync, writeFileSync, renameSync } from 'fs'
import { resolve } from 'path'

import { Plugin, ResolvedConfig } from 'vite'

import { forEachCSSFile } from './utils/forEachCSSFile'
import { validation } from './utils/validation'

let viteConfig: ResolvedConfig
let viteBundle: unknown

const libcss = (): Plugin => ({
  name: 'libcss',
  apply: 'build',
  enforce: 'post',

  configResolved(resolvedConfig) {
    viteConfig = resolvedConfig
  },

  generateBundle: (_, bundle, __) => {
    viteBundle = bundle
  },

  // Rename CSS files and import automatically
  // into the corresponding js file
  writeBundle(options) {
    const issues = validation(viteConfig, viteBundle, options)

    if (issues.notES || issues.error) return

    forEachCSSFile(viteConfig, viteBundle, paths => {
      const componentName = paths.component.split('/').pop()
      const name = `Typeach${componentName}`

      const data = readFileSync(`${paths.component}/index.es.js`, {
        encoding: 'utf8',
      })

      if (componentName !== 'dist') {
        writeFileSync(
          `${paths.component}/index.es.js`,
          `import './${name}.css';\n${data}`
        )
      }
    })
  },

  // Move CSS files to their original folder
  // to keep original structure
  closeBundle: () => {
    const issues = validation(viteConfig, viteBundle)

    if (issues.error) return

    forEachCSSFile(viteConfig, viteBundle, paths => {
      const [oldPath, newPath] = paths.css

      renameSync(oldPath, newPath)
    })
  },
})

export default libcss
