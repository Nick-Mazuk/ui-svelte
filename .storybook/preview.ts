import "tailwindcss/tailwind.css"
// import { themes } from '@storybook/theming'

import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import { addDecorator } from '@storybook/svelte';

addDecorator(
  withTests({
      results,
      filesExt: '((\\.specs?)|(\\.tests?))?(\\.ts)?$'
  })
);

// import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons';

const withThemeProvider = (_, context) =>{
    const theme = context.globals.theme
    console.log(theme);

}

export const decorators = [withThemeProvider];

export const globalTypes = {
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
            }
        ]
    }
};