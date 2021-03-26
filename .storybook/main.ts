module.exports =  {
    stories: ['../src/**/*.stories.svelte'],
    addons: [
        // '@storybook/addon-actions',
        { name: "@storybook/addon-essentials", options: { docs: false, backgrounds: false, actions: false } },
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-postcss',
        '@storybook/addon-svelte-csf',
        '@storybook/addon-jest',
    ],
    webpackFinal: async (config) => {
        const svelteLoader = config.module.rules.find((r) => r.loader && r.loader.includes('svelte-loader'))
        svelteLoader.options.preprocess = require('svelte-preprocess')()
        return config
    },
}
