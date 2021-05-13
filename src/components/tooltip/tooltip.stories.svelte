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
            value: {
                control: {
                    type: 'text',
                },
                type: {
                    required: true,
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story
    name="Default"
    parameters="{{ layout: 'fullscreen' }}"
    args="{{ value: "I'm a tooltip" }}"
    let:args
>
    <main class="w-screen h-screen flex items-center justify-center">
        <Tooltip {...args}>
            <Button slot="trigger">Hover me</Button>
        </Tooltip>
    </main>
</Story>
