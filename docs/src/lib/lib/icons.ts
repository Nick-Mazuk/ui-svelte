import fs from 'fs-extra'

export type AllIcons = string[]

export const getAllIcons = (): AllIcons => {
    return fs
        .readdirSync('./node_modules/@nick-mazuk/ui-svelte/src/elements/icon')
        .filter((name) => name !== 'storybook')
        .map((fileName) => fileName.replace('.svelte', ''))
}
