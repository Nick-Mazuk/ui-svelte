<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import GitHub from '../../elements/icon/github.svelte'
    import YouTube from '../../elements/icon/youtube.svelte'
    import Facebook from '../../elements/icon/facebook.svelte'
    import FooterGroup from './footer-group/footer-group.svelte'
    import FooterLink from './footer-link/footer-link.svelte'
    import FooterSocialLink from './footer-social-link/footer-social-link.svelte'

    import Footer from './footer.svelte'
    import FooterSocialContainer from './footer-social-link-container/footer-social-link-container.svelte'
    import FooterColumn from './footer-column/footer-column.svelte'

    const meta = {
        title: 'Components/Footer',
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

<Story name="Default" parameters="{{ jest: ['footer.test.ts'] }}" let:args>
    <Footer {...args}>
        <FooterGroup title="Group 1">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 2">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 3">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 4">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
    </Footer>
</Story>
<Story name="Light" parameters="{{ jest: ['footer.test.ts'] }}" args="{{ light: true }}" let:args>
    <Footer {...args}>
        <FooterGroup title="Group 1">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 2">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 3">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 4">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
    </Footer>
</Story>

<Story name="Subfooter" parameters="{{ jest: ['footer.test.ts'] }}" let:args>
    <Footer {...args}>
        <FooterGroup title="Group 1">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 2">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 3">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 4">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <svelte:fragment slot="subfooter">
            <p>©{new Date().getFullYear()} Nick Mazuk.</p>
            <FooterSocialContainer>
                <FooterSocialLink href="#" title="Facebook">
                    <Facebook />
                </FooterSocialLink>
                <FooterSocialLink href="#" title="GitHub">
                    <GitHub />
                </FooterSocialLink>
                <FooterSocialLink href="#" title="YouTube">
                    <YouTube />
                </FooterSocialLink>
            </FooterSocialContainer>
        </svelte:fragment>
    </Footer>
</Story>

<Story name="Multi-group column" parameters="{{ jest: ['footer.test.ts'] }}" let:args>
    <Footer {...args}>
        <FooterGroup title="Group 1">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 2">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterGroup title="Group 3">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
        <FooterColumn>
            <FooterGroup title="Group 4">
                <FooterLink href="#">Home</FooterLink>
                <FooterLink href="#">Resources</FooterLink>
            </FooterGroup>
            <FooterGroup title="Group 5">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterGroup>
        </FooterColumn>
    </Footer>
</Story>
