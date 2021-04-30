<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import ComponentTemplate from './component-template.svelte'

    const meta = {
        title: 'ComponentTemplateWithCategory',
        component: ComponentTemplate,
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

<Story name="Default" let:args>
    <ComponentTemplate {...args} />
</Story>
