const toKebabCase = (string: string) => {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export interface BemModifiers {
  [key: string]: boolean | string | number | undefined;
}

export type BemClass = (...classes: (string | BemModifiers)[]) => {
  [key: string]: boolean;
};

export type BemClasses<C extends string> = Record<C, BemClass>;

export interface UseBemOptions<C extends string> {
  prefix?: string;
  children?: C[];
}

/**
 * Class name creator using BEM
 * naming conventions.
 *
 * ```ts
 * const { cardClass, avatarClass } = useBemClasses("card", {
 *  children: ['avatar'],
 * });
 *
 * cardClass() // { "card": true }
 * avatarClass() // { "card__avatar": true }
 * ```
 *
 * @see `useBemClass` for details on individual class options.
 */
export const useBemClasses = <C extends string>(
  name: C,
  options: UseBemOptions<C> = {
    prefix: "",
    children: [],
  }
) => {
  const { prefix = "", children = [] } = options;

  const classes = {
    [`${name}Class`]: useBemClass(name, prefix),
  } as BemClasses<`${C}Class`>;

  children.forEach(child => {
    classes[`${child}Class`] = useBemClass(`${name}__${child}`, prefix);
  });

  return classes;
};

/**
 * Class name creator using
 * BEM naming conventions.
 *
 * ```ts
 * const bem = useBemClass("card");
 *
 * const buttonClasses = bem("button", {
 *  color: 'primary',
 *  disabled: true,
 *  indent: 2,
 *  round: false
 * })
 *
 * { // buttonClasses
 *  "card__button": true,
 *  "card__button--primary": true,
 *  "card__button--disabled": true,
 *  "card__button--indent-2": true,
 *  "card__button--round": false,
 * }
 * ```
 *
 * @see https://getbem.com/naming/
 */
export const useBemClass = (name: string, prefix = "") => {
  const properName = prefix !== "" ? `${prefix}-${name}` : name;

  return (...classes: (string | BemModifiers)[]) => {
    const names = [toKebabCase(properName), ...classes].filter(
      (c): c is string => typeof c === "string"
    );

    const [options] = classes.filter(
      (c): c is BemModifiers => typeof c === "object"
    );

    return toBem(names, options);
  };
};

/**
 * Internal function for `useBemClasses`.
 *
 * Loops through options properties and turns every
 * value into a boolean, and creates a new object
 * with the bem class names.
 */
const toBem = (
  classes: string[] = [],
  options: BemModifiers = {}
): ReturnType<BemClass> => {
  const name = toKebabCase(classes.join("__"));

  const object = { [name]: true };

  Object.keys(options).forEach(key => {
    const value = options[key];

    if (typeof value === "string") {
      object[`${name}--${value}`] = true;
    }

    if (typeof value === "number") {
      object[`${name}--${toKebabCase(key)}-${value}`] = true;
    }

    if (typeof value === "boolean") {
      object[`${name}--${toKebabCase(key)}`] = value;
    }
  });

  return object;
};

/**
 * Returns `useBemClasses` with the
 * prefix option passed down.
 *
 * Useful for using the same prefix
 * across your project.
 *
 * ```ts
 * // Export for usage across app
 * export const usePeachyClasses = useGlobalBemClasses("peachy");
 * ```
 */
export const useGlobalBemClasses = (prefix: string) => {
  return <C extends string>(name: C, children?: C[]) =>
    useBemClasses(name, {
      prefix,
      children,
    });
};

export const usePeachyClasses = useGlobalBemClasses("peachy");
