<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import HeaderMobileSubgroup from './header-mobile-subgroup.svelte'
    import HeaderMobileLink from '../header-mobile-link/header-mobile-link.svelte'

    const meta = {
        title: 'Components/Header/HeaderMobileSubgroup',
        component: HeaderMobileSubgroup,
        parameters: {
            docs: {
                description: {
                    component: '',
                },
            },
        },
        argTypes: {
            items: {
                control: {
                    type: 'object',
                },
                name: 'items',
                defaultValue: [
                    { text: 'Getting started', href: '#' },
                    {
                        text: 'API',
                        href: '#',
                        children: [
                            { text: 'FAQ', href: '#' },
                            { text: 'FAQ', href: '#' },
                        ],
                    },
                ],
                type: { required: true },
                description: 'The items to pass into the `<TableOfContents>` component.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <HeaderMobileSubgroup {...args} visible>
        <HeaderMobileLink slot="main" href="#">Docs</HeaderMobileLink>
    </HeaderMobileSubgroup>
</Story>
