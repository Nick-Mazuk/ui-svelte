<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import Badge from './badge.svelte';

    const meta = {
        title: "Badge",
        component: Badge,
        argTypes: {
            children: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Hello world',
                name: 'children',
                type: { name: 'string', required: true }
            },
            size: {
                control: {
                    type: "select",
                    options: ['primary', 'secondary', 'error', 'highlight', 'warning', 'success'],
                },
                name: 'color',
                description: 'This is the color of the badge',
                type: { name: 'string', required: false }
            },
        },
     };

</script>

<Meta {...meta} />

<Template let:args>
  <Badge {...args}>{args.children}</Badge>
</Template>

<Story name="Default"/>

<Story name='With color' args={{color: 'primary'}} />