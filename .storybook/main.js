const path = require('path')

module.exports = {
  framework: '@storybook/vue3',

  core: { builder: 'webpack5' },

  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],

  stories: ['../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],

  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })

    // const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    // fileLoaderRule.exclude = /\.svg$/

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack', 'url-loader'],
    // })

    return config
  },
}
