<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import StatusDot from './status-dot.svelte'

    const meta = {
        title: 'Elements/StatusDot',
        component: StatusDot,
        argTypes: {
            variant: {
                control: {
                    type: 'select',
                    options: ['gray', 'primary', 'error', 'highlight', 'warning', 'success'],
                },
                defaultValue: 'gray',
            },
            ping: {
                control: {
                    type: 'boolean',
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" parameters="{{ jest: ['status-dot.test.ts'] }}" let:args>
    <StatusDot {...args} />
</Story>
<Story name="Variants" parameters="{{ jest: ['status-dot.test.ts'] }}" let:args>
    <div class="flex space-x-4">
        <StatusDot {...args} variant="gray" />
        <StatusDot {...args} variant="primary" />
        <StatusDot {...args} variant="error" />
        <StatusDot {...args} variant="highlight" />
        <StatusDot {...args} variant="warning" />
        <StatusDot {...args} variant="success" />
    </div>
</Story>
<Story name="Ping" parameters="{{ jest: ['status-dot.test.ts'] }}" args="{{ ping: true }}" let:args>
    <StatusDot {...args} />
</Story>
