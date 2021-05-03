<script lang="ts">
    import { Meta, Story } from '@storybook/addon-svelte-csf'

    import HeaderMobileLink from './header-mobile-link.svelte'

    const meta = {
        title: 'Components/Header/HeaderMobileLink',
        component: HeaderMobileLink,
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
                defaultValue: '/docs',
                type: { required: true },
            },
            matchExact: {
                control: {
                    type: 'boolean',
                },
                defaultValue: false,
                description:
                    'Only styles link as the current page if the current pages matches the `href` exactly.',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args>
    <HeaderMobileLink {...args}>Docs</HeaderMobileLink>
</Story>
