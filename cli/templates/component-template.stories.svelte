<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ComponentTemplate from './component-template.svelte'

    const meta = {
        title: 'ComponentTemplate',
        component: ComponentTemplate,
        argTypes: {
            
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <ComponentTemplate {...args}>{args.children}</ComponentTemplate>
</Template>

<Story name="Default" parameters={{jest: ['component-template.test.ts']}} />
