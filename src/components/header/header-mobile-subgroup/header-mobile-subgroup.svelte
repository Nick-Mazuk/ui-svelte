<script lang="ts">
    import { getContext, setContext } from 'svelte'
    import { writable } from 'svelte/store'
    import type { HeaderContext } from '..'

    import TableOfContents from '../../../navigation/table-of-contents/table-of-contents.svelte'
    import HeaderMobileItemWrapper from '../header-mobile-item-wrapper/header-mobile-item-wrapper.svelte'

    type TocItem = { href: string; text: string }
    type SectionItem = TocItem & { children: TocItem[] }

    export let items: (TocItem | SectionItem)[]
    export let visible = false
    export let basePath: string | undefined = undefined

    const isMainItemActive = writable(false)
    setContext('headerMobileSubgroup', isMainItemActive)
    const headerContext = getContext<HeaderContext>('headerContext')
    const page = typeof headerContext === 'undefined' ? undefined : headerContext.currentPage
    $: currentPage = typeof page === 'undefined' ? '' : $page
    $: isActive = basePath ? currentPage.startsWith(basePath) : $isMainItemActive

</script>

<slot name="main" />
{#if isActive || visible}
    <HeaderMobileItemWrapper class="bg-gray-100">
        <TableOfContents items="{items}" currentItem="{currentPage}" />
    </HeaderMobileItemWrapper>
{/if}
