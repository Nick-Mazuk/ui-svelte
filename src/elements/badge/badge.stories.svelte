<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Badge from './badge.svelte'

    const meta = {
        title: 'Badge',
        component: Badge,
        argTypes: {
            children: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Hello world',
                name: 'children',
                type: { name: 'string', required: true },
            },
            color: {
                control: {
                    type: 'select',
                    options: ['primary', 'secondary', 'error', 'highlight', 'warning', 'success'],
                },
                name: 'color',
                description: 'This is the color of the badge',
                type: { name: 'string', required: false },
            },
            large: {
                control: { type: 'boolean' },
                name: 'large',
                type: { name: 'boolean', required: false },
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

<Template let:args>
    <Badge {...args}>{args.children}</Badge>
</Template>

<Story name="Default" parameters={{jest: ['badge.test.ts']}} />
