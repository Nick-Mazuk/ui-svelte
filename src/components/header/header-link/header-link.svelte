<script lang="ts">
    import { getContext } from 'svelte'
    import { isParentPath } from '@nick-mazuk/lib/esm/url'

    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'
    import type { HeaderContext } from '..'
    import type { SubheaderContext } from '../subheader'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'sm'
    export let href: string
    export let matchExact = false

    const headerContext = getContext<HeaderContext>('headerContext')
    const subheaderContext = getContext<SubheaderContext>('subheaderContext')
    const page = typeof headerContext === 'undefined' ? undefined : headerContext.currentPage
    let isCurrentPath = false

    $: {
        if (typeof page === 'undefined' || typeof $page === 'undefined') isCurrentPath = false
        else if (matchExact) isCurrentPath = $page === href
        else isCurrentPath = isParentPath($page, href)
    }

</script>

<HeaderItemWrapper breakpoint="{subheaderContext ? 'none' : breakpoint}">
    <a
        sveltekit:prefetch
        href="{href}"
        class="flex relative items-center self-stretch hover:text-current transition-color whitespace-nowrap {isCurrentPath
            ? 'text-current font-semibold'
            : 'text-gray-600'}"
        aria-current="{isCurrentPath ? 'page' : undefined}"
    >
        <slot />
        {#if isCurrentPath && subheaderContext}
            <span class="absolute bottom-0 h-0.5 bg-foreground w-full"></span>
        {/if}
    </a>
</HeaderItemWrapper>
