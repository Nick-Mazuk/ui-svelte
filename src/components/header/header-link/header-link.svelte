<script lang="ts">
    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'
    import { isParentPath } from '@nick-mazuk/lib/esm/url'

    import HeaderItemWrapper from '../header-item-wrapper/header-item-wrapper.svelte'

    type Breakpoint = 'sm' | 'md' | 'none'
    export let breakpoint: Breakpoint = 'sm'
    export let href: string
    export let matchExact = false

    const page = getContext<Writable<string> | undefined>('headerPage')
    let isCurrentPath = false

    $: {
        if (typeof page === 'undefined' || typeof $page === 'undefined') isCurrentPath = false
        else if (matchExact) isCurrentPath = $page === href
        else isCurrentPath = isParentPath($page, href)
    }

</script>

<HeaderItemWrapper breakpoint="{breakpoint}">
    <a
        sveltekit:prefetch
        href="{href}"
        class="flex items-center hover:text-current transition-color whitespace-nowrap {isCurrentPath
            ? 'text-current font-semibold'
            : 'text-gray-600'}"
        aria-current="{isCurrentPath ? 'page' : undefined}"
    >
        <slot />
    </a>
</HeaderItemWrapper>
