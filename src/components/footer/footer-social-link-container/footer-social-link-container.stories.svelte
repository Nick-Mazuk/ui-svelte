<script lang="ts">
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import FooterSocialLink from '../footer-social-link/footer-social-link.svelte'
    import GitHub from '../../../elements/icon/github.svelte'
    import YouTube from '../../../elements/icon/youtube.svelte'
    import Facebook from '../../../elements/icon/facebook.svelte'

    import FooterSocialLinkContainer from './footer-social-link-container.svelte'

    const meta = {
        title: 'Components/Footer/FooterSocialLinkContainer',
        component: FooterSocialLinkContainer,
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
    <FooterSocialLinkContainer {...args}>
        <FooterSocialLink href="#" title="Facebook">
            <Facebook />
        </FooterSocialLink>
        <FooterSocialLink href="#" title="GitHub">
            <GitHub />
        </FooterSocialLink>
        <FooterSocialLink href="#" title="YouTube">
            <YouTube />
        </FooterSocialLink>
    </FooterSocialLinkContainer>
</Template>

<Story name="Default" parameters="{{ jest: ['footer-social-link-container.test.ts'] }}" />
