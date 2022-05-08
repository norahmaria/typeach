import { Meta, Story } from '@storybook/vue3'

import ButtonVue from './Button.vue'

export default {
  title: 'Inputs/Button',
} as Meta

const Template: Story = args => ({
  components: { ButtonVue },
  setup() {
    return { args }
  },
  template: `
    <button-vue v-bind="args">
      <div>hello world</div>
    </button-vue>
  `,
})

export const Button: Story = Template.bind({})
