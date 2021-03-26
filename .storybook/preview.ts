import "tailwindcss/tailwind.css"
import { themes } from '@storybook/theming'

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