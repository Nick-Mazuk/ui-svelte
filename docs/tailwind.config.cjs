const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles')

module.exports = {
    presets: [require('@nick-mazuk/ui-config').config],
    purge: {
        content: [
            './src/**/*.svelte',
            './src/**/*.svelte.md',
            './src/app.html',
            '**/node_modules/@nick-mazuk/ui-svelte/**/*.svelte',
            '**/node_modules/@nick-mazuk/ui-svelte/**/*.ts',
        ],
        options: {
            defaultExtractor: (content) => [
                // If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
                ...tailwindExtractor(content),
                // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
                ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
                    ([_match, group, ..._rest]) => group
                ),
            ],
            keyframes: true,
        },
    },
}
