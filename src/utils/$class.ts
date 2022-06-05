import { getCurrentInstance } from 'vue'

interface iClass {
  [key: string]: boolean
}

const toKebabCase = (name: string): string =>
  name.replace(/([A-Za-z])([A-Z])/g, '$1-$2').toLowerCase()

const filterToStrings = (element: string | iClass): element is string =>
  typeof element === 'string'

const filterToObjects = (element: string | iClass): element is iClass =>
  typeof element === 'object'

const getClassObject = (classes: string[], options: iClass): iClass => {
  const name = classes.join('__')

  const object = { [name]: true }

  for (const key of Object.keys(options)) {
    object[`${name}--${key}`] = options[key]
  }

  return object
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const $class = (...classes: (string | iClass)[]) => {
  const component = getCurrentInstance()

  const name = component?.type?.name ?? 'no-name'

  const names = [toKebabCase(name), ...classes].filter(filterToStrings)

  const [options] = classes.filter(filterToObjects)

  return getClassObject(names || [], options || [])
}
