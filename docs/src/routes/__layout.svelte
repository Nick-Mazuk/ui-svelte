<script>
    import { page } from '$app/stores'

    import ResetItems from '$lib/components/reset-items.svelte'
    import Footer from '@nick-mazuk/ui-svelte/src/components/footer/footer.svelte'
    import DarkModeSelect from '@nick-mazuk/ui-svelte/src/elements/dark-mode-select/dark-mode-select.svelte'
    import HeaderBrand from '@nick-mazuk/ui-svelte/src/components/header/header-brand/header-brand.svelte'
    import Header from '@nick-mazuk/ui-svelte/src/components/header/header.svelte'
    import HeaderLink from '@nick-mazuk/ui-svelte/src/components/header/header-link/header-link.svelte'
    import HeaderMobileLink from '@nick-mazuk/ui-svelte/src/components/header/header-mobile-link/header-mobile-link.svelte'
    import HeaderMobileSubgroup from '@nick-mazuk/ui-svelte/src/components/header/header-mobile-subgroup/header-mobile-subgroup.svelte'
    import HeaderItemWrapper from '@nick-mazuk/ui-svelte/src/components/header/header-item-wrapper/header-item-wrapper.svelte'
    import Button from '@nick-mazuk/ui-svelte/src/elements/button/button.svelte'

    import { tableOfContents } from '$lib/lib/table-of-contents'
    import { darkMode } from '$lib/stores/dark-mode'
</script>

<ResetItems />

<Header sticky page="{$page?.path}">
    <HeaderBrand text="UI Svelte" slot="left" />
    <svelte:fragment slot="right">
        <HeaderLink href="/docs">Docs</HeaderLink>
        <HeaderItemWrapper>
            <Button size="small" href="/docs/guides/getting-started">Install</Button>
        </HeaderItemWrapper>
    </svelte:fragment>

    <svelte:fragment slot="mobile">
        <HeaderMobileSubgroup items="{tableOfContents}" basePath="/docs">
            <HeaderMobileLink href="/docs" slot="main">Docs</HeaderMobileLink>
        </HeaderMobileSubgroup>
    </svelte:fragment>
</Header>

<slot />
<Footer>
    <svelte:fragment slot="subfooter">
        <p>©{new Date().getFullYear()} Nick Mazuk.</p>
        <DarkModeSelect store="{darkMode}" />
    </svelte:fragment>
</Footer>
