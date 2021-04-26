<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import MenuItem from './menu-item.svelte'

    const meta = {
        title: 'Components/Menu/MenuItem',
        component: MenuItem,
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
    <MenuItem {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['menu-item.test.ts'] }}" />
