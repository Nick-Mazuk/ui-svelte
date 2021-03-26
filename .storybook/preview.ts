import "tailwindcss/tailwind.css"
import { themes } from '@storybook/theming'

import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import { addDecorator } from '@storybook/svelte';

addDecorator(
  withTests({
      results,
      filesExt: '((\\.specs?)|(\\.tests?))?(\\.ts)?$'
  })
);

export const parameters = {
    darkMode: {
        // Override the default dark theme
        dark: { ...themes.dark, appBg: 'black' },
        // Override the default light theme
        light: { ...themes.normal, appBg: 'white' }
    },
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: 'white',
            },
            {
                name: 'dark',
                value: 'black',
            },
        ],
    },
};