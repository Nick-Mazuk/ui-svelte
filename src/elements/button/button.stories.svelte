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
        argTypes: {},
    }
</script>

<Meta {...meta} />

<Template let:args>
    <p class="mb-4 max-w-lg py-2 px-3 border rounded text-sm leading-tight balance">
        <span class="text-bold">Note</span>: This component is still under active development. It is
        not fully tested or documented, and should not be used in production.
    </p>
    <Button {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['button.test.ts'] }}" />
