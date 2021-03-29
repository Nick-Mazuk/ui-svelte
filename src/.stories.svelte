<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import  from './.svelte'

    const meta = {
        title: '/',
        component: ,
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

<Template let:args>
    < {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['.test.ts'] }}" />
