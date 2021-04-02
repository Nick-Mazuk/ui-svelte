<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Github from '../../elements/icon/github.svelte'

    import Footer from './footer.svelte'
    import FooterSocialLink from './footer-social-link/footer-social-link.svelte'

    const meta = {
        title: 'Layouts/Footer',
        component: Footer,
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
    <Footer {...args} />
</Template>

<Story name="Default" parameters="{{ jest: ['footer.test.ts'] }}" let:args>
    <Footer {...args}>
        <svelte:fragment slot="copyright">
            ©{new Date().getFullYear()} Nick Mazuk. All rights reserved.
        </svelte:fragment>
        <svelte:fragment slot="social-links">
            <FooterSocialLink href="#">
                <Github />
            </FooterSocialLink>
        </svelte:fragment>
    </Footer>
</Story>
