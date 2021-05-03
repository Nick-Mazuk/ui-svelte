<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import HeaderMobileLink from '../header-mobile-link/header-mobile-link.svelte'

    import HeaderMobileGroup from './header-mobile-group.svelte'

    const meta = {
        title: 'Components/Header/HeaderMobileGroup',
        component: HeaderMobileGroup,
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
                    type: 'test',
                },
                defaultValue: 'Title',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <HeaderMobileGroup {...args} />
</Story>
<Story name="With links" let:args>
    <HeaderMobileGroup {...args}>
        <HeaderMobileLink href="#">Docs</HeaderMobileLink>
        <HeaderMobileLink href="#">About</HeaderMobileLink>
        <HeaderMobileLink href="#">Contact</HeaderMobileLink>
    </HeaderMobileGroup>
</Story>
