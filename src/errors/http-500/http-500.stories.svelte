<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Http500 from './http-500.svelte'

    const meta = {
        title: 'Errors/Http500',
        component: Http500,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            isDevelopment: {
                control: { type: 'boolean' },
                defaultValue: true,
                type: { name: 'boolean', required: true },
            },
            status: {
                control: { type: 'number' },
                defaultValue: 500,
                type: { name: 'number', required: true },
            },
            error: {
                control: { type: 'error' },
                defaultValue: new Error('Example error'),
                type: { name: 'error', required: true },
            },
            message: {
                control: { type: 'text' },
                defaultValue:
                    "It's not you, it's me. Our systems made a mistake and we could not process your request. Try refreshing the page.",
                type: { name: 'text', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <Http500 {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['http-500.test.ts'] }}" />
