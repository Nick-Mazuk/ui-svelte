import { action } from '@storybook/addon-actions';
import Component from './component.svelte';

export default {
  title: 'Component',
  component: Component,
};

export const Text = () => ({
    Component: Component,
    props: { name: 'World', buttonText: 'Hello Button' },
    on: { click: action('clicked') },
});