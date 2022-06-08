import { getCurrentInstance } from 'vue'

interface options {
  [key: string]: boolean | string
}

interface Class {
  [key: string]: boolean
}

const toKebabCase = (name: string): string =>
  name.replace(/([A-Za-z])([A-Z])/g, '$1-$2').toLowerCase()

const filterToStrings = (element: string | options): element is string =>
  typeof element === 'string'

const filterToObjects = (element: string | options): element is options =>
  typeof element === 'object'

const isString = (element: string | boolean): element is string =>
  typeof element === 'string'

const isBoolean = (element: string | boolean): element is boolean =>
  typeof element === 'boolean'

const getClassObject = (classes: string[], options: options): Class => {
  const name = classes.join('__')

  const object = { [name]: true }

  for (const key of Object.keys(options)) {
    const value = options[key]

    // variant class
    if (isString(value)) {
      object[`${name}--${value}`] = true
    }

    // conditional class
    if (isBoolean(value)) {
      object[`${name}--${key}`] = value
    }
  }

  return object
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const $class = (...classes: (string | options)[]) => {
  const component = getCurrentInstance()

  const name = component?.type?.name ?? 'no-name'

  const names = [toKebabCase(name), ...classes].filter(filterToStrings)

  const [options] = classes.filter(filterToObjects)

  return getClassObject(names || [], options || [])
}
