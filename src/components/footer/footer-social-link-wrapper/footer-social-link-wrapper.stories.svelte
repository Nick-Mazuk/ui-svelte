<script lang="ts">
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import FooterSocialLink from '../footer-social-link/footer-social-link.svelte'
    import GitHub from '../../../elements/icon/github.svelte'
    import YouTube from '../../../elements/icon/youtube.svelte'
    import Facebook from '../../../elements/icon/facebook.svelte'

    import FooterSocialLinkWrapper from './footer-social-link-wrapper.svelte'

    const meta = {
        title: 'Components/Footer/FooterSocialLinkWrapper',
        component: FooterSocialLinkWrapper,
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
    <FooterSocialLinkWrapper {...args}>
        <FooterSocialLink href="#" title="Facebook">
            <Facebook />
        </FooterSocialLink>
        <FooterSocialLink href="#" title="GitHub">
            <GitHub />
        </FooterSocialLink>
        <FooterSocialLink href="#" title="YouTube">
            <YouTube />
        </FooterSocialLink>
    </FooterSocialLinkWrapper>
</Template>

<Story name="Default" parameters="{{ jest: ['footer-social-link-wrapper.test.ts'] }}" />
