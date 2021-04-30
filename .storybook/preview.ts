import '@nick-mazuk/ui-config/lib/colors.css'
import '@nick-mazuk/ui-config/lib/styles.css'

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
    viewport: {
        viewports: {
            smMin: {
                name: 'sm - min',
                styles: {
                    width: '300px',
                    height: '600px',
                }
            },
            smMax: {
                name: 'sm - max',
                styles: {
                    width: '639px',
                    height: '600px',
                }
            },
            mdMin: {
                name: 'md - min',
                styles: {
                    width: '640px',
                    height: '600px',
                }
            },
            mdMax: {
                name: 'md - max',
                styles: {
                    width: '767px',
                    height: '600px',
                }
            },
            lgMin: {
                name: 'lg - min',
                styles: {
                    width: '768px',
                    height: '600px',
                }
            },
            lgMax: {
                name: 'lg - max',
                styles: {
                    width: '1023px',
                    height: '600px',
                }
            },
        }
    }
}
