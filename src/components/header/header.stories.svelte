<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import Button from '../../elements/button/button.svelte'
    import HeaderBrand from './header-brand/header-brand.svelte'
    import HeaderItemWrapper from './header-item-wrapper/header-item-wrapper.svelte'

    import Header from './header.svelte'
    import HeaderLink from './header-link/header-link.svelte'
    import HeaderMobileLink from './header-mobile-link/header-mobile-link.svelte'

    const meta = {
        title: 'Components/Header',
        component: Header,
        parameters: {
            docs: {
                description: {
                    component:
                        "A header component for the top of your webpages. For accesibility, make sure you add a `<main id='main-content'>` to the final webpage, so screenreaders and keyboard users can skip directly to the main content.",
                },
            },
        },
        argTypes: {
            sticky: {
                control: { type: 'boolean' },
                name: 'sticky',
                type: { name: 'boolean', required: false },
            },
            small: {
                control: { type: 'boolean' },
                name: 'small',
                type: { name: 'boolean', required: false },
            },
            page: {
                control: { type: 'string' },
                description: 'Current page of the website',
            },
        },
    }
</script>

<Meta {...meta} />

<Story name="Default" let:args parameters="{{ layout: 'fullscreen' }}">
    <div class="overflow-x-hidden overflow-y-scroll max-h-full fixed w-full">
        <Header {...args}>
            <HeaderBrand text="UI Svelte" slot="left" />
            <svelte:fragment slot="right">
                <HeaderLink href="#">Docs</HeaderLink>
                <HeaderLink href="#">About</HeaderLink>
                <HeaderLink href="#">Contact</HeaderLink>
            </svelte:fragment>
            <svelte:fragment slot="mobile">
                <HeaderMobileLink href="#">Docs</HeaderMobileLink>
                <HeaderMobileLink href="#">About</HeaderMobileLink>
                <HeaderMobileLink href="#">Contact</HeaderMobileLink>
            </svelte:fragment>
        </Header>
        <div id="main-content"></div>
    </div>
</Story>
<Story name="Sticky" args="{{ sticky: true }}" let:args parameters="{{ layout: 'fullscreen' }}">
    <div class="overflow-x-hidden overflow-y-scroll max-h-full fixed w-full">
        <Header {...args}>
            <HeaderBrand text="UI Svelte" slot="left" />
            <svelte:fragment slot="right">
                <HeaderLink href="#">Docs</HeaderLink>
                <HeaderLink href="#">About</HeaderLink>
                <HeaderLink href="#">Contact</HeaderLink>
            </svelte:fragment>
            <svelte:fragment slot="mobile">
                <HeaderMobileLink href="#">Docs</HeaderMobileLink>
                <HeaderMobileLink href="#">About</HeaderMobileLink>
                <HeaderMobileLink href="#">Contact</HeaderMobileLink>
            </svelte:fragment>
        </Header>
        <div id="main-content" class="wrapper">
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
            <div class="h-32 rounded-lg my-4 bg-gray-200"></div>
        </div>
    </div>
</Story>
<Story name="Buttons" args="{{ sticky: true }}" let:args parameters="{{ layout: 'fullscreen' }}">
    <Header {...args}>
        <HeaderBrand text="UI Svelte" slot="left" />
        <svelte:fragment slot="right">
            <HeaderItemWrapper>
                <Button size="small" variant="secondary">Sign in</Button>
            </HeaderItemWrapper>
            <HeaderItemWrapper>
                <Button size="small">Register</Button>
            </HeaderItemWrapper>
        </svelte:fragment>
    </Header>
</Story>
