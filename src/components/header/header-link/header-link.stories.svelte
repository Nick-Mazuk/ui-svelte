<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
    import Header from '../header.svelte'
    import HeaderLink from './header-link.svelte'

    const meta = {
        title: 'Components/Header/HeaderLink',
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
            breakpoint: {
                control: {
                    type: 'radio',
                    options: ['sm', 'md', 'none'],
                },
                defaultValue: 'sm',
                description:
                    'Only shows the link above the breakpoint. Equivalent to using responsive utilities in Tailwind.',
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

<Story name="Default" parameters="{{ jest: ['header-link.test.ts'] }}" let:args>
    <Header>
        <svelte:fragment slot="right">
            <HeaderLink {...args}>Docs</HeaderLink>
        </svelte:fragment>
    </Header>
</Story>
<Story name="Current page" parameters="{{ jest: ['header-link.test.ts'] }}" let:args>
    <Header page="/docs">
        <svelte:fragment slot="right">
            <HeaderLink {...args} href="/">Home</HeaderLink>
            <HeaderLink {...args}>Docs</HeaderLink>
        </svelte:fragment>
    </Header>
</Story>
<Story
    name="Current page - exact"
    parameters="{{ jest: ['header-link.test.ts'] }}"
    args="{{ matchExact: true }}"
    let:args
>
    <Header page="/docs">
        <svelte:fragment slot="right">
            <HeaderLink {...args} href="/">Home</HeaderLink>
            <HeaderLink {...args}>Docs</HeaderLink>
        </svelte:fragment>
    </Header>
</Story>
<Story
    name="Breakpoints"
    parameters="{{ jest: ['header-link.test.ts'] }}"
    args="{{ matchExact: true }}"
    let:args
>
    <Header page="/">
        <svelte:fragment slot="right">
            <HeaderLink {...args} breakpoint="none">none</HeaderLink>
            <HeaderLink {...args} breakpoint="sm">sm</HeaderLink>
            <HeaderLink {...args} breakpoint="md">md</HeaderLink>
        </svelte:fragment>
    </Header>
</Story>
