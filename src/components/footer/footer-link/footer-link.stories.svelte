<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'

    import FooterLink from './footer-link.svelte'

    const meta = {
        title: 'Components/Footer/FooterLink',
        component: FooterLink,
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
                defaultValue: '#',
                type: {
                    required: true,
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <ul>
        <FooterLink {...args}>Home</FooterLink>
    </ul>
</Template>

<Story name="Default" />
