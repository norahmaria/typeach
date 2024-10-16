You can provide your own CSS classes for all components that renders an element by using the class attribute, but alongside that - **every component gets attached a class that follows the [BEM](https://getbem.com/introduction/) naming convention**:

- `peachy-<component>` for a root component.
- `peachy-<component>__<component-child-name>` for any child components.
