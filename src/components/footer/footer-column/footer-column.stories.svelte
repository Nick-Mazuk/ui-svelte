<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import FooterGroup from '../footer-group/footer-group.svelte'
    import FooterLink from '../footer-link/footer-link.svelte'

    import FooterColumn from './footer-column.svelte'

    const meta = {
        title: 'Components/Footer/FooterColumn',
        component: FooterColumn,
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

<Story name="Default" let:args>
    <FooterColumn {...args}>
        <FooterGroup title="Pages">
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
        </FooterGroup>
        <FooterGroup title="Other">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
        </FooterGroup>
    </FooterColumn>
</Story>
