import fs from 'fs'
import { resolve } from 'path'

let viteConfig

const libcss = () => ({
  name: 'libcss',
  apply: 'build',
  enforce: 'post',

  configResolved(resolvedConfig) {
    viteConfig = resolvedConfig
  },

  writeBundle(options, bundle) {
    if (!viteConfig.build || !viteConfig.build.lib) {
      console.error('Vite plugin libcss is only intended for library builds')
      return
    }

    if (options.format !== 'es') return

    const files = Object.keys(bundle)
    const cssFile = files.find(v => v.endsWith('.css'))

    if (!cssFile) return

    for (const file of files) {
      if (!bundle[file].isEntry) continue

      const outDir = viteConfig.build.outDir || 'dist'
      const filePath = resolve(viteConfig.root, outDir, file)

      const data = fs.readFileSync(filePath, {
        encoding: 'utf8',
      })

      fs.writeFileSync(filePath, `import './${cssFile}';\n${data}`)
    }
  },
})

export default libcss
