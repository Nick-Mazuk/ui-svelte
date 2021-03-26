const postCssLoader = './postCssLoader'

module.exports = {
    stories: ['../src/**/*.stories.ts'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-postcss',
        { name: "@storybook/addon-essentials", options: { docs: false } },
    ],
    webpackFinal: async (config) => {
        const svelteLoader = config.module.rules.find((r) => r.loader && r.loader.includes('svelte-loader'))
        svelteLoader.options.preprocess = require('svelte-preprocess')()
        return config
    },
}
