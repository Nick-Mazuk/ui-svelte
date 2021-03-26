const postCssLoader = './postCssLoader'

module.exports = {
    stories: ['../src/**/*.stories.ts'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-viewport',
        '@storybook/addon-controls',
        '@storybook/addon-a11y',
        '@storybook/addon-postcss',
    ],
}
