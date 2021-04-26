<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import Menu from './menu.svelte'

    const meta = {
        title: 'Components/Menu',
        component: Menu,
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
    <Menu {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['menu.test.ts'] }}" />
