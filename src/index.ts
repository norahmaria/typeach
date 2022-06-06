// import { App } from 'vue'
// import * as components from './components'

// User can import individual components..
export * from './components'

// TODO: Consider if it's worth having built in option
// to register all components as it is anti three-shaking
// and type is set to any for all components.

// const typeach = (Vue: App) => {
//   for (const component of Object.values(components)) {
//     const [prefix, name] = component.name.split('Typeach')

//     Vue.component(
//       component.name,
//       import(`./components/${name}/${component.name}.vue`)
//     )
//   }
// }

// export default typeach
