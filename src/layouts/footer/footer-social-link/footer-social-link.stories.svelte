<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Github from '../../../elements/icon/github.svelte'

    import FooterSocialLink from './footer-social-link.svelte'

    const meta = {
        title: 'Layouts/Footer/FooterSocialLink',
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
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <FooterSocialLink {...args}>
        <Github />
    </FooterSocialLink>
</Template>

<Story name="Default" parameters="{{ jest: ['footer-social-link.test.ts'] }}" />
