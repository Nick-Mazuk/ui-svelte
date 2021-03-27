<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import StatusDot from './status-dot.svelte'

    const meta = {
        title: 'Elements/StatusDot',
        component: StatusDot,
        argTypes: {
            color: {
                control: {
                    type: 'select',
                    options: ['primary', 'secondary', 'error', 'highlight', 'warning', 'success'],
                },
                name: 'color',
                type: { name: 'string', required: false },
            },
            ping: {
                control: {
                    type: 'boolean',
                },
                name: 'ping',
                type: { name: 'boolean', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <StatusDot {...args}>{args.children}</StatusDot>
</Template>

<Story name="Default" parameters={{jest: ['status-dot.test.ts']}} />
