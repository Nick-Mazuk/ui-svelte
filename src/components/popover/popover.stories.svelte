<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'

    import Popover from './popover.svelte'

    const meta = {
        title: 'Components/Popover',
        component: Popover,
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
                    type: 'select',
                    options: [
                        'top',
                        'right',
                        'bottom',
                        'left',
                        'top-start',
                        'top-end',
                        'right-start',
                        'right-end',
                        'left-start',
                        'left-end',
                        'bottom-start',
                        'bottom-end',
                    ],
                },
                defaultValue: 'right-start',
            },
            overlay: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            disabled: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
            },
            transitionSpeed: {
                control: {
                    type: 'inline-radio',
                    options: ['none', 'small', 'medium', 'large'],
                },
                defaultValue: 'none',
            },
        },
    }

</script>

<Meta {...meta} />

<Template let:args>
    <Popover {...args} />
</Template>

<Story name="Default" parameters="{{ layout: 'fullscreen' }}" let:args>
    <div class="min-w-screen min-h-screen flex items-center justify-center">
        <Popover {...args}>
            <Button variant="secondary" slot="trigger">Open popover</Button>
            <div class="bg-gray-900 p-2 rounded text-background">I'm a popover</div>
        </Popover>
    </div>
</Story>

<Story name="Events" parameters="{{ layout: 'fullscreen' }}" let:args>
    <div class="min-w-screen min-h-screen flex items-center justify-center">
        <Popover {...args} on:close="{() => alert('closed')}" on:open="{() => alert('opened')}">
            <Button variant="secondary" slot="trigger">Open popover</Button>
            <div class="bg-gray-900 p-2 rounded text-background">I'm a popover</div>
        </Popover>
    </div>
</Story>
