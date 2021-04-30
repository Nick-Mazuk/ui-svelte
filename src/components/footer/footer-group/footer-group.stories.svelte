<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import FooterLink from '../footer-link/footer-link.svelte'

    import FooterGroup from './footer-group.svelte'

    const meta = {
        title: 'Components/Footer/FooterGroup',
        component: FooterGroup,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            title: {
                control: {
                    type: 'text',
                },
                defaultValue: 'Other',
                type: {
                    required: true,
                },
            },
        },
    }
</script>

<Meta {...meta} />

<Template let:args>
    <FooterGroup {...args}>
        <FooterLink href="#">Home</FooterLink>
        <FooterLink href="#">Resources</FooterLink>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
    </FooterGroup>
</Template>

<Story name="Default" />
