module.exports = {
    stories: ['../src/**/*.stories.svelte', '../src/**/*.stories.mdx'],
    addons: [
        'storybook-addon-turbo-build',
        { name: '@storybook/addon-essentials', options: { backgrounds: false, actions: true } },
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
        svelteLoader.options.preprocess = require('svelte-preprocess')({
            tsconfigFile: './tsconfig.json',
        })
        return config
    },
}
