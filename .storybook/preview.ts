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
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'circle',
            // array of plain string values or MenuItem shape (see below)
            items: ['light', 'dark'],
        },
    },
};