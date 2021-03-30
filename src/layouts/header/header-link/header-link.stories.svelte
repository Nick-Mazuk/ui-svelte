<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    const meta = {
        title: 'Layouts/Header/HeaderLink',
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
    <!-- <HeaderLink {...args} /> -->
</Template>

<Story name="Default" parameters="{{ jest: ['header-link.test.ts'] }}" />
