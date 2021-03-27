<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import ComponentTemplate from './component-template.svelte'

    const meta = {
        title: 'ComponentTemplateWithCategory',
        component: ComponentTemplate,
        parameters: {
            docs: {
                description: {
                    component: ''
                }
            }
        },
        argTypes: {
            
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <ComponentTemplate {...args}></ComponentTemplate>
</Template>

<Story name="Default" parameters={{jest: ['component-template.test.ts']}} />
