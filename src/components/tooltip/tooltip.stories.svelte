<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'

    import Tooltip from './tooltip.svelte'

    const meta = {
        title: 'Components/Tooltip',
        component: Tooltip,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            placement: {
                control: {
                    type: 'inline-radio',
                    options: ['top', 'right', 'bottom', 'left'],
                },
                defaultValue: 'bottom',
            },
            forButton: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'If the tooltip is for a button or some other focusable element, this should be true. Otherwise, keyboard users will need to double-tab to focus on the button.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ layout: 'fullscreen' }}" let:args>
    <main class="w-screen h-screen flex items-center justify-center">
        <Tooltip {...args}>I'm a tooltip</Tooltip>
    </main>
</Story>
<Story
    name="Custom trigger"
    args="{{ forButton: true }}"
    parameters="{{ layout: 'fullscreen' }}"
    let:args
>
    <main class="w-screen h-screen flex items-center justify-center">
        <Tooltip {...args}>
            <Button slot="trigger" variant="error">Delete</Button>
            This cannot be undone
        </Tooltip>
    </main>
</Story>
