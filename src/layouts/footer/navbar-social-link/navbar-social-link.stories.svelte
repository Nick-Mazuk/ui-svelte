<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Github from '../../../elements/icon/github.svelte'

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
        argTypes: {
            href: {
                control: {
                    type: 'text',
                },
                name: 'href',
                defaultValue: '#',
                type: { name: 'string', required: true },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <NavbarSocialLink {...args}>
        <Github />
    </NavbarSocialLink>
</Template>

<Story name="Default" parameters="{{ jest: ['navbar-social-link.test.ts'] }}" />
