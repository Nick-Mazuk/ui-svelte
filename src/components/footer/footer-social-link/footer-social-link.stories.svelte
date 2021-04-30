<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Github from '../../../elements/icon/github.svelte'

    import FooterSocialLink from './footer-social-link.svelte'

    const meta = {
        title: 'Components/Footer/FooterSocialLink',
        component: FooterSocialLink,
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
            title: {
                control: {
                    type: 'text',
                },
                name: 'title',
                defaultValue: 'Github',
                type: { name: 'string', required: true },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <FooterSocialLink {...args}>
        <Github />
    </FooterSocialLink>
</Template>

<Story name="Default" />
