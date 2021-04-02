import '@nick-mazuk/ui-config/colors.css'
import '@nick-mazuk/ui-config/styles.css'

import { withTests } from '@storybook/addon-jest'

import results from '../.jest-test-results.json'
import { addDecorator } from '@storybook/svelte'

addDecorator(
    withTests({
        results,
        filesExt: '((\\.specs?)|(\\.tests?))?(\\.ts)?$',
    })
)

export const parameters = {
    themes: {
        default: 'light',
        list: [
            {
                name: 'light',
                class: 'light',
                color: 'white',
            },
            {
                name: 'dark',
                class: 'dark',
                color: 'black',
            },
        ],
    },
}
