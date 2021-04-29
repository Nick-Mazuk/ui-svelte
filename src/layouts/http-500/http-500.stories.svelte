<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Http500 from './http-500.svelte'

    const meta = {
        title: 'Layouts/Http500',
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
                defaultValue: false,
                type: { required: true },
            },
            status: {
                control: { type: 'number' },
                defaultValue: 500,
                type: { required: true },
            },
            error: {
                control: { type: 'error' },
                defaultValue: new Error('Example error'),
                type: { required: true },
            },
            message: {
                control: { type: 'text' },
                defaultValue:
                    "It's not you, it's me. Our systems made a mistake and we could not process your request. Try refreshing the page.",
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['http-500.test.ts'] }}" let:args>
    <Http500 {...args} />
</Story>
<Story
    name="Development"
    parameters="{{ jest: ['http-500.test.ts'] }}"
    args="{{ isDevelopment: true }}"
    let:args
>
    <Http500 {...args} />
</Story>
