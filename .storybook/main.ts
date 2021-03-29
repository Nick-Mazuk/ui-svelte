module.exports = {
    stories: ['../src/**/*.stories.svelte'],
    addons: [
        // '@storybook/addon-actions',
        { name: '@storybook/addon-essentials', options: { backgrounds: false, actions: false } },
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-svelte-csf',
        '@storybook/addon-jest',
        'storybook-addon-themes',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        // 'storybook-dark-mode'
    ],
    webpackFinal: async (config) => {
        const svelteLoader = config.module.rules.find(
            (r) => r.loader && r.loader.includes('svelte-loader')
        )
        svelteLoader.options.preprocess = require('svelte-preprocess')()
        return config
    },
}
