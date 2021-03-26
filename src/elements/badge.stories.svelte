<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import Badge from './badge.svelte';

    const meta = {
        title: "Badge",
        component: Badge,
        argTypes: {
            size: {
                control: {
                    type: "select",
                    options: ["primary", "secondary", "success"],
                },
                name: 'color',
                describe: 'hello world'
            },
        },
     };

</script>

<Meta {...meta} />

<Template let:args>
  <Badge {...args}>Hello world again</Badge>
</Template>

<Story name="Default" args={{}}/>

<Story name='With color' args={{color: 'primary'}} />