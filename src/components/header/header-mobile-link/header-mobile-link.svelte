<script lang="ts">
    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'
    import { isParentPath } from '@nick-mazuk/lib/esm/url'
    import HeaderMobileItemWrapper from '../header-mobile-item-wrapper/header-mobile-item-wrapper.svelte'
    import type { HeaderContext } from '..'

    export let href: string
    export let matchExact = false

    const headerContext = getContext<HeaderContext>('headerContext')
    const page = headerContext?.currentPage
    const subgroupContext = getContext<Writable<boolean> | undefined>('headerMobileSubgroup')
    let isCurrentPath = false

    $: {
        if (typeof page === 'undefined' || typeof $page === 'undefined') isCurrentPath = false
        else if (matchExact) isCurrentPath = $page === href
        else isCurrentPath = isParentPath($page, href)
    }
    $: if (subgroupContext) subgroupContext.set(isCurrentPath)
</script>

<HeaderMobileItemWrapper>
    <a
        sveltekit:prefetch
        href="{href}"
        class="hover:text-current transition-color whitespace-nowrap {isCurrentPath
            ? 'text-current font-semibold'
            : 'text-gray-600'}"
        aria-current="{isCurrentPath ? 'page' : undefined}"
    >
        <slot />
    </a>
</HeaderMobileItemWrapper>
