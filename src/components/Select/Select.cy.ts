import { mount } from 'cypress/vue'
import TypeachSelect from './TypeachSelect.vue'

describe('A sample test', () => {
  it('Renders text', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    mount(TypeachSelect, {
      propsData: {
        title: 'Select Example',
        id: '1',
      },
    })

    cy.get('h2').should('have.text', 'Select Example')
  })
})
