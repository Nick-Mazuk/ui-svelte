<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ProgressBar from './progress-bar.svelte'

    const meta = {
        title: 'Elements/ProgressBar',
        component: ProgressBar,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            value: {
                control: {
                    type: 'range',
                    min: 0,
                    max: 100,
                    step: 1,
                },
                defaultValue: 75,
            },
            max: {
                control: {
                    type: 'number',
                },
                defaultValue: 100,
            },
            variant: {
                control: {
                    type: 'inline-radio',
                    options: ['gray', 'primary'],
                },
                defaultValue: 'gray',
            },
            ariaLabel: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Storybook',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <ProgressBar {...args} />
</Story>
