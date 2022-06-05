export const getDuplicates = (array: string[]) => {
  const duplicated = array.filter(
    (item, index) => array.indexOf(item) !== index
  )

  return [...Array.from(new Set(duplicated))]
}

export const getComponentsInViteBuild = (viteBundle: unknown) =>
  Object.values(viteBundle)
    .filter(it => it.fileName.endsWith('index.es.js'))
    .map(it => it.fileName.split('/').slice(-2)[0])
    .filter(it => !it.endsWith('.js'))
