/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */

const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles')

module.exports = {
    presets: [require('@nick-mazuk/ui-config').config],
    purge: {
        content: ['./src/**/*.svelte', './src/**/*.stories.mdx'],
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
