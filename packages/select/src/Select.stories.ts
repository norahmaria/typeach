import { Meta, Story } from '@storybook/vue3'

import SelectVue from './Select.vue'

export default {
  title: 'Inputs/Select',
} as Meta

const Template: Story = args => ({
  components: { SelectVue },
  setup() {
    return { args }
  },
  template: `
    <select-vue v-bind="args">
      <div>hello world</div>
    </select-vue>
  `,
})

export const Select: Story = Template.bind({})
Select.args = {
  title: 'Title prop',
  snowflake: 'Snowflake prop',
}
