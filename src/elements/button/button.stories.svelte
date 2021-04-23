<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Button from './button.svelte'

    const meta = {
        title: 'Elements/Button',
        component: Button,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            color: {
                control: {
                    type: 'select',
                    options: ['primary', 'error', 'success', 'warning', 'gray', 'highlight'],
                },
                defaultValue: 'primary',
            },
            variant: {
                control: {
                    type: 'radio',
                    options: ['filled', 'text'],
                },
                defaultValue: 'filled',
            },
            size: {
                control: {
                    type: 'radio',
                    options: ['small', 'default', 'large'],
                },
                defaultValue: 'default',
            },
            shape: {
                control: {
                    type: 'radio',
                    options: ['none', 'square', 'circle'],
                },
                defaultValue: 'none',
            },
            shadow: {
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
            width: {
                control: {
                    type: 'text',
                },
                description: 'Width in Tailwind units, or `full` for 100%',
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <p class="mb-4 max-w-lg py-2 px-3 border rounded text-sm leading-tight balance">
        <span class="text-bold">Note</span>: This component is still under active development. It is
        not fully tested or documented, and should not be used in production.
    </p>
    <Button {...args}>Click me</Button>
</Template>

<Story name="Default" parameters="{{ jest: ['button.test.ts'] }}" />
