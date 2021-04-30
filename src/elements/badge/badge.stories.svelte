<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import Badge from './badge.svelte'

    const meta = {
        title: 'Elements/Badge',
        component: Badge,
        argTypes: {
            variant: {
                control: {
                    type: 'select',
                    options: ['gray', 'primary', 'error', 'highlight', 'warning', 'success'],
                },
                name: 'color',
                defaultValue: 'gray',
                type: { name: 'string', required: false },
            },
            size: {
                control: {
                    type: 'select',
                    options: ['default', 'large'],
                },
                name: 'size',
            },
            dot: {
                control: { type: 'boolean' },
                name: 'dot',
                type: { name: 'boolean', required: false },
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <Badge {...args}>Badge</Badge>
</Story>
<Story name="Sizes" let:args>
    <div class="flex space-x-4">
        <div><Badge {...args} size="default">Badge</Badge></div>
        <div><Badge {...args} size="large">Badge</Badge></div>
    </div>
</Story>
<Story name="Variants" let:args>
    <div class="flex space-x-4">
        <div><Badge {...args} variant="gray">Badge</Badge></div>
        <div><Badge {...args} variant="primary">Badge</Badge></div>
        <div><Badge {...args} variant="error">Badge</Badge></div>
        <div><Badge {...args} variant="highlight">Badge</Badge></div>
        <div><Badge {...args} variant="warning">Badge</Badge></div>
        <div><Badge {...args} variant="success">Badge</Badge></div>
    </div>
</Story>
<Story name="Dot" args="{{ dot: true }}" let:args>
    <Badge {...args}>Badge</Badge>
</Story>
