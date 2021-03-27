<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import TextContent from './text-content.svelte'

    const meta = {
        title: 'Typography/TextContent',
        component: TextContent,
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
    <TextContent {...args}>{args.children}</TextContent>
</Template>

<Story name="Default" parameters={{jest: ['text-content.test.ts']}} />
