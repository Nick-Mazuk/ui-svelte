<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import HeaderItemWrapper from './header-item-wrapper.svelte'

    const meta = {
        title: 'Layouts/Header/HeaderItemWrapper',
        component: HeaderItemWrapper,
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
    <HeaderItemWrapper {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['header-item-wrapper.test.ts'] }}" />
