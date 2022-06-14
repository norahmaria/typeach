// YourComponent.stories.js
import { Story, Meta } from '@storybook/vue3'
import { TypeachButton } from '../../index'

export default {
  component: TypeachButton,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'danger', 'warning', 'info', 'neutral'],
      },
    },
  },
} as Meta

const Template: Story = args => ({
  components: { TypeachButton },
  setup() {
    return { args }
  },
  template: '<TypeachButton v-bind="args">Button</TypeachButton>',
})

export const Second: Story = Template.bind({})

Second.args = {
  id: 'doekdoe',
  /* 👇 The args you need here will depend on your component */
}
