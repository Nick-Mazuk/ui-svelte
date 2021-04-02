<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import NavbarSocialLink from './navbar-social-link.svelte'

    const meta = {
        title: 'Layouts/Footer/NavbarSocialLink',
        component: NavbarSocialLink,
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
    <NavbarSocialLink {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['navbar-social-link.test.ts'] }}" />
