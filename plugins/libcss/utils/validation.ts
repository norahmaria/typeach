import { ResolvedConfig } from 'vite'
import { getComponentsInViteBuild, getDuplicates } from './getDuplicates'

export const validation = (
  viteConfig: ResolvedConfig,
  viteBundle: unknown,
  options?: unknown & { format: string }
) => {
  const components = getComponentsInViteBuild(viteBundle)
  const duplicates = getDuplicates(components).join(', ')

  const value = {
    error: null,
    notES: options?.format !== 'es' ?? true,
  }

  if (!viteConfig.build || !viteConfig.build.lib) {
    value.error = 'Vite plugin libcss is only intended for library builds'
  }

  if (duplicates.length) {
    value.error = `Libcss requires all components to have unique names, found non unique: ${duplicates}`
  }

  if (value.error) console.error(value.error)

  return value
}
